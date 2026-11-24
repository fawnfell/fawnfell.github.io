# TOEIC Service List (TSL) 1.2 — 署名与相同方式共享

**来源**：TOEIC Service List v1.2，作者 Dr. Charles Browne、Dr. Brent Culligan
**获取地址**：http://www.newgeneralservicelist.org/
**许可**：Creative Commons Attribution-ShareAlike 4.0 International（CC BY-SA 4.0）
**许可全文**：https://creativecommons.org/licenses/by-sa/4.0/

## 本项目使用了什么

- TSL 的 **1,250 个词头（headwords）及其排名/频次排序**。

## 本项目没有使用什么

- TSL 官方的英文释义（`TSL_12_definitions.xlsx`）**未随 App 分发，也未作为生成新释义的模型输入**。
- TSL 的例句、语料原文均未使用。

## 我们做了哪些修改

- 从中选取 1,250 个词头作为课程词表（与 TSL 1.2 的规模一致）。
- 英文释义由本项目管线重新撰写（本地 `qwen3.6:27b-bf16`，仅输入单词、词性、课程例句与搭配，不输入 TSL 释义）。
- 中文释义由同一管线生成；日文、韩文由 Gemini 生成后经抽检校订。
- 例句取自本项目原创的 42 集剧情。

## 相同方式共享（ShareAlike）

依据 CC BY-SA 4.0 第 3(b) 条，**由 TSL 词表衍生的词表部分**以 CC BY-SA 4.0 提供：

- 纯词表：`licenses/wordlist-tsl.txt`
- 词典数据中的词头集合：`app/assets/dictionary/dictionary.json` 的键集合

上述词表可以自由复制、修改、再分发，条件是保留本署名并以相同许可共享。

## 不在此许可范围内的内容

本项目的英文释义、例句、42 集剧情、角色设定、配音、美术、App 代码均为独立作品，
**不因使用 TSL 词表而适用 CC BY-SA**，其权利由本项目作者保留。

## 建议的署名文本（App 内使用）

> Vocabulary based on the TOEIC Service List (TSL) v1.2, developed by Dr. Charles Browne
> and Dr. Brent Culligan, used under the Creative Commons Attribution-ShareAlike 4.0
> International License. Changes: word list kept at 1,250 headwords; definitions and
> examples written for this app; Chinese, Japanese and Korean glosses added.
