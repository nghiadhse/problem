-- A
SELECT 
	t.id,
    t.friendly_name,
    t.scientific_name,
    u.name,
    (SELECT COUNT(*) FROM likes_table l where t.id = l.tree_id) as likes
FROM tree_table t, user_table u 
WHERE u.email = 'adam@versett.com' AND t.owner_id = u.id;

-- B
SELECT 
	t.id,
    t.friendly_name,
    t.scientific_name,
    u.name,
    (SELECT COUNT(*) FROM likes_table l where t.id = l.tree_id) as likes
FROM tree_table t, user_table u 
WHERE u.email <> 'adam@versett.com' AND t.owner_id = u.id;

-- C
SELECT 
	t.id,
    t.friendly_name,
    t.scientific_name,
    u.name,
    (SELECT COUNT(*) FROM likes_table l where t.id = l.tree_id) as likes
FROM tree_table t, user_table u 
WHERE t.owner_id = u.id
HAVING likes >= 3;