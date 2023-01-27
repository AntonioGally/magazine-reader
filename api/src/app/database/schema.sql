CREATE DATABASE magazinereader;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  userId UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  userName VARCHAR NOT NULL,
  userLastName VARCHAR NOT NULL,
  userEmail VARCHAR UNIQUE NOT NULL,
  userPassword TEXT NOT NULL,
  userCreationDate TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS magazines (
    magazineId UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    magazineName VARCHAR NOT NULL,
    magazineDescription VARCHAR,
    magazineImage VARCHAR,
    magazineUrl VARCHAR NOT NULL,
    magazineCreatedDate TIMESTAMP NOT NULL,
    magazineCreatedBy UUID,
    FOREIGN KEY(magazineCreatedBy) REFERENCES users(userId)
);

CREATE TABLE IF NOT EXISTS editions (
    editionId UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    editionUrl VARCHAR,
    editionCreatedDate TIMESTAMP NOT NULL,
    editionMagazine UUID,
    FOREIGN KEY(editionMagazine) REFERENCES magazines(magazineId)
);

CREATE TABLE IF NOT EXISTS selectors (
    selectorId UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    selectorName VARCHAR NOT NULL,
    selectorSiteMap VARCHAR NOT NULL,
    selectorIndexOf VARCHAR NOT NULL,
    selectorMagazine UUID,
    FOREIGN KEY(selectorMagazine) REFERENCES magazines(magazineId)
);