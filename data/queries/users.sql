CREATE TABLE users (
	id integer PRIMARY KEY,
	created_at timestamp,
	name text,
	username text,
	image text,
	headline text,
	recommended_by_id integer,
	followers_count integer,
	followings_count integer,
	votes_count integer,
	posts_count integer,
	maker_of_count integer,
	comments_count integer,
	profile_url text
)