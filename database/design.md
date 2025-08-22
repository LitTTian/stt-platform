- 评论表的设计

```sql
CREATE TABLE comments (
    id                BIGSERIAL PRIMARY KEY,
    post_id           BIGINT NOT NULL,
    user_id           BIGINT NOT NULL,
    parent_comment_id BIGINT,
    content           TEXT NOT NULL,
    like_count        INT NOT NULL DEFAULT 0,
    is_hidden         BOOLEAN NOT NULL DEFAULT FALSE,
    is_deleted        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMP NOT NULL DEFAULT now(),
    updated_at        TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_parent_comment FOREIGN KEY (parent_comment_id) REFERENCES comments (id)
);

-- 索引优化
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_post_like ON comments(post_id, like_count DESC);
```

- 便于：

1. 按时间排序评论

```sql
SELECT * FROM comments
WHERE post_id = 123
ORDER BY created_at ASC;
```


2. 按照相关设置排序

```sql
SELECT * FROM comments
WHERE post_id = 123
ORDER BY like_count DESC, created_at ASC
LIMIT 10;
```


自定义热度

```sql
SELECT
    c.id,
    c.post_id,
    c.content,
    COALESCE(child_count, 0) * 10 
    + c.like_count * 5
    + COALESCE(child_like_sum, 0) * 3 AS hot_score
FROM comments c
LEFT JOIN (
    -- 统计每条顶级评论的子评论数量和子评论点赞数总和
    SELECT parent_comment_id,
           COUNT(*) AS child_count,
           SUM(like_count) AS child_like_sum
    FROM comments
    WHERE parent_comment_id IS NOT NULL
    GROUP BY parent_comment_id
) AS stats ON c.id = stats.parent_comment_id
WHERE c.post_id = 123
  AND c.parent_comment_id IS NULL  -- 只计算顶级评论热度
ORDER BY hot_score DESC;
```



3. 二级/多级评论

```sql
SELECT * FROM comments
WHERE parent_comment_id = 456;
```
