---
layout: "@/layout/PostLayout.astro"
title: TypeScriptでプロトタイプ拡張
description: TypeScriptでプロトタイプを拡張する方法のメモ
date: 2024-02-23T06:34:01.000Z
tags: ["typescript"]
---

やったことがなかったので試してみた。標準APIとの衝突やimport忘れによる実行時エラー等の心配があるので実用はしないと思うけどねー。

実装方法が正しいのかどうかはよくわかっていない😇

### main.ts

```typescript
import "./set.ts"; // これが無いと実行時エラー💦

const s1 = new Set([2, 1, 3]);
const s2 = new Set([4, 2]);

const s3 = s1.union(s2);
const s4 = s1.difference(s2);
const s5 = s1.intersection(s2);
const s6 = s1.symmetricDifference(s2);

console.log(s3); // Set(4) { 2, 1, 3, 4 }
console.log(s4); // Set(2) { 1, 3 }
console.log(s5); // Set(1) { 2 }
console.log(s6); // Set(3) { 1, 3, 4 }
```

### set.ts

```typescript
/// <reference types="./set.d.ts" />

Set.prototype.union ??= function <T>(this: Set<T>, other: Set<T>) {
  const s = new Set<T>();

  for (const e of this) {
    s.add(e);
  }

  for (const e of other) {
    s.add(e);
  }

  return s;
};

Set.prototype.difference ??= function <T>(this: Set<T>, other: Set<T>) {
  const s = new Set<T>();

  for (const e of this) {
    s.add(e);
  }

  for (const e of other) {
    s.delete(e);
  }

  return s;
};

Set.prototype.intersection ??= function <T>(this: Set<T>, other: Set<T>) {
  const s = new Set<T>();

  for (const e of this) {
    if (other.has(e)) {
      s.add(e);
    }
  }

  return s;
};

Set.prototype.symmetricDifference ??= function <T>(this: Set<T>, other: Set<T>) {
  const s = new Set<T>();

  for (const e of this) {
    s.add(e);
  }

  for (const e of other) {
    if (s.has(e)) {
      s.delete(e);
    } else {
      s.add(e);
    }
  }

  return s;
};
```

### set.d.ts

```typescript
interface Set<T> {
  union(other: Set<T>): Set<T>;
  difference(other: Set<T>): Set<T>;
  intersection(other: Set<T>): Set<T>;
  symmetricDifference(other: Set<T>): Set<T>;
}
```

### 環境

```text
> deno --version
deno 1.40.3 (release, aarch64-apple-darwin)
v8 12.1.285.6
typescript 5.3.3
```
