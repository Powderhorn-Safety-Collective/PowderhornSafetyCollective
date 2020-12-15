CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"address" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"adult" BOOLEAN NOT NULL,
	"on_patrol" BOOLEAN NOT NULL,
	"on_call" BOOLEAN NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




CREATE TABLE "incidents" (
	"id" serial NOT NULL,
	"type" varchar(511) NOT NULL,
	"notes" varchar(1000),
	"location" varchar(255) NOT NULL,
	"time_submitted" TIMESTAMP NOT NULL,
	"status" varchar(255) NOT NULL,
	"view_publicly" BOOLEAN,
	"responder_notes" varchar(1000),
	"duplicate_entry" BOOLEAN,
	"client_id" varchar(255) NOT NULL,
	CONSTRAINT "incidents_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "incident_followers" (
	"id" serial NOT NULL,
	"incident_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "incident_followers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "roles" (
	"id" serial NOT NULL,
	"type" varchar(255) NOT NULL,
	CONSTRAINT "roles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_roles" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "users_roles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_skills" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	CONSTRAINT "users_skills_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "skills" (
	"id" serial NOT NULL,
	"type" varchar(255) NOT NULL,
	CONSTRAINT "skills_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "incident_followers" ADD CONSTRAINT "incident_followers_fk0" FOREIGN KEY ("incident_id") REFERENCES "incidents"("id");
ALTER TABLE "incident_followers" ADD CONSTRAINT "incident_followers_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");


ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_fk1" FOREIGN KEY ("role_id") REFERENCES "roles"("id");

ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_fk1" FOREIGN KEY ("skill_id") REFERENCES "skills"("id");

