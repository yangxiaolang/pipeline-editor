/*
 * Copyright 2018-2023 Elyra Authors
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

import actions from "./command-actions/locales";
import canvas from "./common-canvas/locales";
import properties from "./common-properties/locales";
import common from "./common/locales";
import form from "./form/locales";
import palette from "./palette/locales";
import toolbar from "./toolbar/locales";

export const Message = {
  de: {
    ...actions.de,
    ...canvas.de,
    ...properties.de,
    ...palette.de,
    ...toolbar.de,
  },
  en: {
    ...actions.en,
    ...canvas.en,
    ...properties.en,
    ...palette.en,
    ...toolbar.en,
    ...common.en,
    ...form.en,
  },
  es: {
    ...actions.es,
    ...canvas.es,
    ...properties.es,
    ...palette.es,
    ...toolbar.es,
  },
  fr: {
    ...actions.fr,
    ...canvas.fr,
    ...properties.fr,
    ...palette.fr,
    ...toolbar.fr,
  },
  it: {
    ...actions.it,
    ...canvas.it,
    ...properties.it,
    ...palette.it,
    ...toolbar.it,
  },
  ja: {
    ...actions.ja,
    ...canvas.ja,
    ...properties.ja,
    ...palette.ja,
    ...toolbar.ja,
  },
  "pt-BR": {
    ...actions["pt-BR"],
    ...canvas["pt-BR"],
    ...properties["pt-BR"],
    ...palette["pt-BR"],
    ...toolbar["pt-BR"],
  },
  "zh-TW": {
    ...actions["zh-TW"],
    ...canvas["zh-TW"],
    ...properties["zh-TW"],
    ...palette["zh-TW"],
    ...toolbar["zh-TW"],
  },
  "zh-CN": {
    ...actions["zh-CN"],
    ...canvas["zh-CN"],
    ...properties["zh-CN"],
    ...palette["zh-CN"],
    ...toolbar["zh-CN"],
    ...common["zh-CN"],
    ...form["zh-CN"],
  },
  ru: {
    ...actions.ru,
    ...canvas.ru,
    ...properties.ru,
    ...palette.ru,
    ...toolbar.ru,
  },
  eo: {
    ...actions.eo,
    ...canvas.eo,
    ...properties.eo,
    ...palette.eo,
    ...toolbar.eo,
  },
  ko: {
    ...actions.ko,
    ...canvas.ko,
    ...properties.ko,
    ...palette.ko,
    ...toolbar.ko,
  },
  sv: {
    ...actions.sv,
    ...canvas.sv,
    ...properties.sv,
    ...palette.sv,
    ...toolbar.sv,
  },
};

export type SupportLang =
  | "en"
  | "zh-CN"
  | "zh-TW"
  | "sv"
  | "ko"
  | "eo"
  | "ru"
  | "it"
  | "pt-BR"
  | "ja"
  | "fr"
  | "es"
  | "de";

export const getLocale = (lang: SupportLang) => Message[lang] || Message["en"];
