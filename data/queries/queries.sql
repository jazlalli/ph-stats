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

-- ranked distribution of posts by month
COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT AVG(votes_count), month
	FROM (
		SELECT votes_count, EXTRACT(MONTH FROM created_at) as month
		FROM posts
	) as a
	GROUP BY month
	ORDER BY month ASC, AVG(votes_count) DESC
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/month.json';

-- ranked distribution of posts by day of the year
COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT AVG(votes_count), dayofmonth
	FROM (
		SELECT votes_count, EXTRACT(DAY FROM created_at) as dayofmonth
		FROM posts
	) as a
	GROUP BY dayofmonth
	ORDER BY dayofmonth ASC, AVG(votes_count) DESC
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/daysofmonth.json';

-- users who are key/leading indicators of a high score
COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT user_id, users.image, user_username, COUNT(votes.id)
	FROM votes
		INNER JOIN users ON votes.user_id = users.id
	GROUP BY user_id, user_username, users.image
	ORDER BY COUNT(votes.id) DESC
	LIMIT 100
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/topvoters.json';

COPY (SELECT to_json(array_agg(r)) FROM (
	SELECT username, image, maker_of_count
	FROM users
	WHERE maker_of_count>2
	ORDER BY maker_of_count DESC
) as r) TO '/Users/jazlalli/ph-hackathon/ph-stats/data/topmakers.json';