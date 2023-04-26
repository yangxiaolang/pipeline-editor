/*
 * Copyright 2018-2022 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useMemo } from "react";

import Form, { UiSchema, Widget, AjvError } from "@rjsf/core";
import { useIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";

import {
  FileWidget,
  CustomFieldTemplate,
  ArrayTemplate,
  CustomOneOf,
} from "../CustomFormControls";

export const Message = styled.div`
  margin-top: 14px;
  padding: 0 22px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeight};
  font-size: ${({ theme }) => theme.typography.fontSize};
  color: ${({ theme }) => theme.palette.text.primary};
  opacity: 0.5;
`;

function processField(fieldNames: string[]) {
  return function processFieldValues(
    obj: Record<string, unknown>,
    callback: (value: any) => any
  ) {
    const newObj: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === "object" && !Array.isArray(value)) {
          newObj[key] = processFieldValues(
            value as Record<string, unknown>,
            callback
          );
        } else if (fieldNames.includes(key)) {
          newObj[key] = callback(value);
        } else {
          newObj[key] = value;
        }
      }
    }

    return newObj;
  };
}

const widgets: { [id: string]: Widget } = {
  file: FileWidget,
};

interface Props {
  data: any;
  schema?: any;
  onChange?: (data: any) => any;
  onFileRequested?: (options: any) => any;
  onPropertiesUpdateRequested?: (options: any) => any;
}

export function PropertiesPanel({
  data,
  schema,
  onChange,
  onFileRequested,
  onPropertiesUpdateRequested,
}: Props) {
  const intl = useIntl();

  const translateTitleAndDes = processField(["title", "description"]);

  const schemaTranslated = useMemo(
    () =>
      translateTitleAndDes(schema, (value) =>
        intl.formatMessage({ id: value })
      ),
    [intl, schema, translateTitleAndDes]
  );

  if (schema === undefined) {
    return (
      <Message>
        <FormattedMessage id="form.noProperty"></FormattedMessage>
      </Message>
    );
  }

  let uiSchema: UiSchema = {};
  for (const field in schemaTranslated.properties) {
    uiSchema[field] = {};
    const properties = schemaTranslated.properties[field];
    if (properties.type === "object") {
      for (const subField in properties.properties) {
        const subProps = properties.properties[subField];
        if (typeof subProps !== "boolean" && subProps.uihints) {
          uiSchema[field][subField] = subProps.uihints;
        }
      }
    }
    if (typeof properties !== "boolean" && properties.uihints) {
      uiSchema[field] = properties.uihints;
    }
  }

  uiSchema = {
    ...uiSchema,
    ...schemaTranslated.uihints,
  };

  return (
    <Form
      formData={data}
      uiSchema={uiSchema}
      schema={schemaTranslated as any}
      onChange={(e) => {
        const newFormData = e.formData;
        const params =
          schemaTranslated.properties?.component_parameters?.properties;
        for (const field in params) {
          if (params[field].oneOf) {
            for (const option of params[field].oneOf) {
              if (option.widget?.const !== undefined) {
                newFormData.component_parameters[field].widget =
                  option.widget.const;
              }
            }
          }
        }
        onChange?.(e.formData);
      }}
      formContext={{
        onFileRequested: async (args: any) => {
          return await onFileRequested?.({
            ...args,
            filename: data.component_parameters.filename,
          });
        },
        onPropertiesUpdateRequested: async (args: any) => {
          const newData = await onPropertiesUpdateRequested?.(args);
          onChange?.(newData);
        },
        formData: data,
      }}
      id={data?.id}
      widgets={widgets}
      fields={{
        OneOfField: CustomOneOf,
      }}
      liveValidate
      ArrayFieldTemplate={ArrayTemplate}
      noHtml5Validate
      FieldTemplate={CustomFieldTemplate}
      className={"elyra-formEditor"}
      transformErrors={(errors: AjvError[]) => {
        // Suppress the "oneof" validation because we're using oneOf in a custom way.
        const transformed = [];
        for (const error of errors) {
          if (
            error.message !== "should match exactly one schema in oneOf" &&
            (error as any).schemaPath?.includes("oneOf") &&
            error.message !== "should be object" &&
            error.message !== "should be string"
          ) {
            transformed.push(error);
          }
        }
        return transformed;
      }}
    />
  );
}
