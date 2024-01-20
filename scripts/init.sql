CREATE TABLE default.clickstream_rt
(
	timestamp DateTime64,
	referer String,
	location String,
	remoteHost String,
	partyId String,
	sessionId String,
	pageViewId String,
	eventType String,
	item_id String,
	item_price Int64,
	item_url String,
	basket_price Float64,
	detectedDuplicate UInt8,
	detectedCorruption UInt8,
	firstInSession UInt8,
	userAgentName String
) ENGINE = MergeTree()
  PARTITION BY toYYYYMM(timestamp)
  PRIMARY KEY timestamp
  ORDER BY timestamp
  SETTINGS index_granularity = 8192;
---------------------------------------------
  /*
table for get data from kafka
  */
  

  CREATE TABLE default.clickstream_in
(
	timestamp DateTime64,
	referer String,
	location String,
	remoteHost String,
	partyId String,
	sessionId String,
	pageViewId String,
	eventType String,
	item_id String,
	item_price Int64,
	item_url String,
	basket_price Float64,
	detectedDuplicate UInt8,
	detectedCorruption UInt8,
	firstInSession UInt8,
	userAgentName String
) ENGINE = Kafka SETTINGS kafka_broker_list = 'kafka:9092',
                          kafka_topic_list = 'clickstream',
                          kafka_group_name = 'clickstream_consumer_group_1',
						  ettings kafka_thread_per_consumer = 1,
						  kafka_num_consumers = 1;
                          kafka_format = 'JSONEachRow';

/*
materialized view for kafka table
*/

CREATE MATERIALIZED VIEW default.clickstream_in_mv TO default.clickstream_rt AS
SELECT *
FROM default.clickstream_in;
