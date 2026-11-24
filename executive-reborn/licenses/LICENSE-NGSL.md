# New General Service List (NGSL) 1.2 — 署名与相同方式共享

**来源**：New General Service List v1.2，作者 Dr. Charles Browne、Dr. Brent Culligan、Joseph Phillips（2013）
**获取地址**：http://www.newgeneralservicelist.org/
**许可**：Creative Commons Attribution-ShareAlike 4.0 International（CC BY-SA 4.0）
**许可全文**：https://creativecommons.org/licenses/by-sa/4.0/

## 本项目使用了什么

- NGSL 1.2 的 **2,809 个词头及其 SFI 排名与频次数据**，按官方排名切分为四个学习档（band）。

## 本项目没有使用什么

- NGSL 官方未随词表发布释义文件；本项目**没有**从任何第三方"NGSL 日文版/中文版"词表抓取内容。
- 未使用 NGSL 的例句（官方列表不含例句）。

## 我们做了哪些修改

- 按官方 SFI Rank 切分为 `1-500` / `501-1000` / `1001-1800` / `1801-2809` 四档，与分班测试一致。
- 词性、英文释义、中文/日文/韩文释义、例句由本项目管线生成（Gemini flash-lite 直出 + 抽检）。
- 前 287 个功能词（the / be / and 等）保留在数据中但标记 `fw: true`，不进入学习队列。

## 相同方式共享（ShareAlike）

依据 CC BY-SA 4.0 第 3(b) 条，**由 NGSL 词表衍生的词表部分**以 CC BY-SA 4.0 提供：

- 纯词表：`licenses/wordlist-ngsl.txt`
- 词卡数据中的词头集合：`app/assets/content/decks/ngsl.json` 的 `word` 字段

## 不在此许可范围内的内容

词性判断、四语释义、例句、音频、App 代码为独立作品，不适用 CC BY-SA，权利由本项目作者保留。

## 建议的署名文本（App 内使用）

> Vocabulary based on the New General Service List (NGSL) v1.2, developed by Dr. Charles
> Browne, Dr. Brent Culligan and Joseph Phillips, used under the Creative Commons
> Attribution-ShareAlike 4.0 International License. Changes: split into four study bands
> by SFI rank; parts of speech, definitions and examples written for this app.
