-- DATABASE NAME --
psc_database


 CREATE TABLE "incident_followers" (
	"id" serial NOT NULL,
	"incident_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "incident_followers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "incidents" (
	"id" serial NOT NULL,
	"type" varchar(511) NOT NULL,
	"notes" varchar(1000),
	"location" varchar(255) NOT NULL,
	"time_submitted" TIMESTAMP (255) NOT NULL,
	"view_publicly" BOOLEAN NOT NULL DEFAULT 'false',
	"duplicate_entry" BOOLEAN NOT NULL DEFAULT 'false',
	"client_id" integer NOT NULL unique,
	"username" varchar(255),
	"username_public" BOOLEAN NOT NULL DEFAULT 'false',
	"timedate_public" BOOLEAN NOT NULL DEFAULT 'false',
	"location_public" BOOLEAN NOT NULL DEFAULT 'false',
	"type_public" BOOLEAN NOT NULL DEFAULT 'false',
	"user_notes_public" BOOLEAN NOT NULL DEFAULT 'false',
	"text_for_public_display" varchar(2000),
	"active" BOOLEAN NOT NULL DEFAULT 'true',
	"assigned_user" integer,
	"submitted_user" integer,
	CONSTRAINT "incidents_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "internal_notes" (
	"id" serial NOT NULL,
	"text" varchar(1000) NOT NULL,
	"incident_id" integer NOT NULL,
	"time" timestamp without time zone NOT NULL,
	CONSTRAINT "internal_notes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "skills" (
	"id" serial NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "skills_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"address" varchar(500),
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"adult" BOOLEAN NOT NULL,
	"role" integer NOT NULL DEFAULT '1',
	"on_patrol" BOOLEAN NOT NULL DEFAULT 'false',
	"on_call" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_skills" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	CONSTRAINT "user_skills_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "incident_followers" ADD CONSTRAINT "incident_followers_fk0" FOREIGN KEY ("incident_id") REFERENCES "incidents"("id");
ALTER TABLE "incident_followers" ADD CONSTRAINT "incident_followers_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "incidents" ADD CONSTRAINT "incidents_fk0" FOREIGN KEY ("assigned_user") REFERENCES "user"("id");
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_fk1" FOREIGN KEY ("submitted_user") REFERENCES "user"("id");

ALTER TABLE "internal_notes" ADD CONSTRAINT "internal_notes_fk0" FOREIGN KEY ("incident_id") REFERENCES "incidents"("id");



ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_fk1" FOREIGN KEY ("skill_id") REFERENCES "skills"("id");

--INSERT DATA into SKILLS Table
INSERT INTO "skills" ("description") 
VALUES ('First Aid'), ('Dispatch'), ('Mental Health Training'), ('Nutrition'), ('Patrolling'), ('De-escalation'), ('Biking'), ('Multilinguistic'), ('Handy-Person'), ('Dog Walking');