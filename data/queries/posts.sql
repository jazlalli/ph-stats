CREATE TABLE posts (
	id integer PRIMARY KEY,
	created_at timestamp,
	name text,
	tagline text,
	user_id integer,
	user_username text,
	votes_count integer,
	comments_count integer,
	redirect_url text,
	discussion_url text
)