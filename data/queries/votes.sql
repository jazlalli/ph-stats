CREATE TABLE votes (
	id integer PRIMARY KEY,
	created_at timestamp,
	user_id integer,
	post_id integer,
	user_username text,
	post_name text,
	post_tagline text,
	post_discussion_url text
)