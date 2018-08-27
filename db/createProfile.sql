INSERT INTO profiles(
    users,
    pass,
    email
)
VALUES(
    $1,
    $2,
    $3
)
RETURNING *;