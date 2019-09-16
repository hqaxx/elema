const MongoClient = require('mongodb').MongoClient
class MongoUtil {
  constructor (host, port, dbName) {
    this.host = host
    this.port = port
    this.dbName = dbName
  }
  connectDb (fn) {
    const url = 'mongodb://' + this.host + ':' + this.port + '/' + this.dbName
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
      if (err) throw err
      fn(client)
    })
  }
  delete (json, collName, fn) {
    this.connectDb(client => {
      const db = client.db(this.dbName)
      const coll = db.collection(collName)
      coll.deleteMany(json, (err, result) => {
        fn(err, result)
        client.close()
      })
    })
  }
  insert (json, collName, fn) {
    this.connectDb(client => {
      const db = client.db(this.dbName)
      const coll = db.collection(collName)
      if (json.constructor === Array) {
        coll.insertMany(json, (err, result) =>
          fn(err, result)
        )
      } else {
        coll.insertOne(json, (err, result) =>
          fn(err, result)
        )
      }
      client.close()
    })
  }
  update (condition, val, collName, fn) {
    this.connectDb(client => {
      const db = client.db(this.dbName)
      const coll = db.collection(collName)
      coll.updateMany(condition, val, (err, result) => {
        fn(err, result)
        client.close()
      })
    })
  }
  find (condition, args, collName, fn) {
    this.connectDb(client => {
      const db = client.db(this.dbName)
      const coll = db.collection(collName)
      const props = args.props || {}
      const sort = args.sort || {}
      const skipNum = args.skip || 0
      const limitNum = args.limit || 0
      coll.find(condition, props).sort(sort).skip(skipNum).limit(limitNum).toArray((err, result) => {
        fn(err, result)
        client.close()
      })
    })
  }
  count (condition, args, collName, fn) {
    this.connectDb(client => {
      const db = client.db(this.dbName)
      const coll = db.collection(collName)
      const props = args.props || {}
      const sort = args.sort || {}
      const skipNum = args.skipNum || 0
      const limitNUm = args.limitNum || 0
      coll.find({
        condition,
        props
      }).sort(sort).skip(skipNum).limit(limitNum).toArray((err, result) => {
        fn(err, result.length)
        client.close()
      })
    })
  }
}
module.exports = MongoUtil
