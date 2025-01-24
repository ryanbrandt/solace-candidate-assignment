# Assignment Discussion

Notes on my tweaks to the initial repository

## Backend

### Database Changes

#### Naming Conventions

I always use singular naming in table names. This was a quick fix of `advocates` -> `advocate`. I come from more of a background in `MySql` and `SqlServer`, but this has always been the convention I've followed.

#### Advocate Table Partitioning

Based on my understanding of the application and the fact that we could be dealing with many advocates, it seemed like we could easily break down the `advocate` table to eliminate data redundancy.

1. Extracted `city` into its own table with a bridging `advocate_city` table. I figured with many adovcates cities would quickly become repeated. Plus, `city` alone has no concept of a state, chances are every state has a Springfield. Also, I figured it may be possible for an adovcate to serve multiple cities. This update reduces redundancy and gives us more flexibility. For simplicity I made the assumption we are only working with US cities.

2. Extracted `degree` into its own table with a briding `advocate_degree` table. Same idea here, degree will quickly become repeated over and over with many advocates. I also figured an advocate could have many degrees (e.g. a PhD and MSW).

3. Extracted `specialty` into its own table with a bridging `advocate_specialty` table. Last one but same thing, with many advocates we will be repeating specialties over and over. Plus, searching a `jsonb` column can get pretty nasty at scale. This change will remove redundancy like the others, but also could improve query performance if we find ourselves filtering down on specialty often.

##### Downsides of this Change

Had to spend some time updating the seed data and the seeding logic became more complex. Not sure if there is a cleaner way to do this since I am new to `drizzle-orm`. Also had to configure all of the ORM relations, which ended up taking longer than I expected!

#### Things I Would Do With More Time and Information

1. Create some nice schema generation utilities. This is my first time using `drizzle-orm` so I'm not familiar with its intricacies. It could be nice to extract the repetitive bridge table creation into a utility `pgBridgeTable`, like I did with the `pgEnumTable` helper.

2. Think of a better way to illustrate experience than just `years_of_experience`. I feel like we could capture more metadata about this that might be nice to show to users.

3. Capture more advocate contact information. How does the advocate prefer to be contacted? Email? Phone? Do they have a physical office location?

### API Changes

#### Filtering, Re-Assembling Advocate Graph and Pagination

I noticed we were doing a lot of potentially heavy filtering on the client side. I do like how filtering on the client gets you realtime updates as users update filters, however, if we're dealing with many advocates this could quickly become a performance issue. The best bet for simplicity seemed to be bringing this labor over to the server with some optional query parameters.

I added support for optionally passing in all of these filters as query parameters, and then reflected the query to match. This bit was a little tricky since I'm new to this ORM, but I was able to get it working and able to use the drizzle query builder to re-assemble the now partitioned `advocate` graph so that we get all of the information we want in the response.

I also added pagination, since that is a nice way to improve performance on the query itself and gets us prepared for scale. If we have many advocates, we could quickly exceed our API response size limit by dumping all of the data in the database, and we could impact performance on the client if they have to store all of this data in memory and then render it on the page at the same time.

#### Things I Would Do With More Time and Information

1. Managing database instance-- is there some way to use dependency injection so we aren't just passing the database around?

2. Query parameter validation. There currently is none, and we would want to handle that in a production app with a `401` response.

3. Auth-- Do we need to worry about authentication and authorization?

4. Test coverage!

5. Build out endpoints like `GET /degree`, `GET /specialty` and `GET /city`. This is one of the perks of breaking these out of the `advocate` table, we could list these so our client could show a nice list of what specialties, cities and degrees we have available, rather than having them guess with a text search.
