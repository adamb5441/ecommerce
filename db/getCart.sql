SELECT numberof, cart_id, img, item, price
FROM products JOIN cart
ON products.id = cart.reference
WHERE profile_num = $1 
ORDER BY cart_id 
