-- ranked distribution of posts by day of the week
COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT AVG(votes_count), dayofweek
	FROM (
		SELECT votes_count, EXTRACT(DOW FROM created_at) as dayofweek
		FROM posts
	) as a
	GROUP BY dayofweek
	ORDER BY dayofweek ASC, AVG(votes_count) DESC
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/dayofweek.json';

-- ranked distribution of posts by day of the year
COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT AVG(votes_count), dayofyear
	FROM (
		SELECT votes_count, EXTRACT(DOY FROM created_at) as dayofyear
		FROM posts
	) as a
	GROUP BY dayofyear
	ORDER BY dayofyear ASC, AVG(votes_count) DESC
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/dayofyear.json';

-- ranked distribution of posts by hour of the day
COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT AVG(votes_count), hourofday
	FROM (
		SELECT votes_count, EXTRACT(HOUR FROM created_at) as hourofday
		FROM posts
	) as a
	GROUP BY hourofday
	ORDER BY hourofday ASC, AVG(votes_count) DESC
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/hourofday.json';

-- users who are key/leading indicators of a high score
COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT user_id, user_username, COUNT(id)
	FROM votes
	GROUP BY user_id, user_username
	ORDER BY COUNT(id) DESC
	LIMIT 100
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/topvoters.json';

COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT id, username, maker_of_count
	FROM users
	WHERE maker_of_count>2
	ORDER BY maker_of_count DESC
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/topmakers.json';