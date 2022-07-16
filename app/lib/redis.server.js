const dayjs = require("dayjs");
const Redis = require("ioredis");
let redis

if (!redis) {
  console.log("init redis")
  redis = new Redis();
}

async function main() {
  if (!redis) {
    console.log("no redis"); return
  }
  const scores = [
    { name: "Bob", score: 80 },
    { name: "Jeff", score: 59 },
    { name: "Tom", score: 100 },
    { name: "Alex", score: 99 },
  ];
  await redis.zadd(
    "user-zset",
    ...scores.map(({ name, score }) => [score, name])
  );

  const zrange = await redis.zrange("user-zset", 2, 3)
  console.log("zrange", zrange); // [ 'Alex', 'Tom' ]

  const all = await redis.zrange("user-zset", 0, -1)
  console.log("all", all);

  const withscores = await redis.zrange("user-zset", 2, 3, "WITHSCORES");
  console.log("withscores", withscores); // [ 'Alex', '99.5', 'Tom', '100' ]

  //console.log(await redis.zrange("user-zset", 2, 3, "REV")); // [ 'Bob', 'Jeff' ]

  // const byscore = await redis.zrange("user-zset", 2, 3, "BYSCORE")
  // console.log("byscore", byscore); // [ 'Bob', 'Alex', 'Tom' ]

  return all
}

async function getAll(type) {
  if (!redis) {
    console.log("no redis"); return
  }
  const all = await redis.zrange(type, 0, -1)
  console.log("all", all);

  const parsed = all.map(i => JSON.parse(i))

  // const withscores = await redis.zrange(type, 0, -1, "WITHSCORES");
  // console.log("withscores", withscores)

  return parsed
}

function add(type, events) {
  if (!redis) {
    console.log("no redis"); return
  }
  return redis.zadd(
    type,
    ...events.map((e) => {
      const score = dayjs(e.datetime).valueOf();
      const json = JSON.stringify(e);
      return [score, json];
    }
    )
  );
}
module.exports = {
  main,
  add,
  getAll
}
