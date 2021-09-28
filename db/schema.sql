-- Database schema

DROP DATABASE IF EXISTS project2;
CREATE DATABASE project2;

DROP TABLE green_energy;

-- create green energy table
CREATE TABLE green_energy (
    id serial PRIMARY KEY,
    state character varying(30) NOT NULL,
    urban_solar numeric,
    rural_solar numeric,
    rooftop_solar numeric,
    csp_solar numeric,
    onshore_wind numeric,
    offshore_wind numeric,
    biopower_solid numeric,
    biopower_gaseous numeric,
    geotermal_hydrothermal numeric,
    egs_geothermal numeric,
    hydropower numeric,
    rank numeric,
    energy_consumption numeric,
    population numeric
);

select * from green_energy;


DROP TABLE energy_comparison;

-- create energy_comparison table
CREATE TABLE energy_comparison(
    id serial primary key not null, 
	rank numeric,
	state varchar(30) not null,
	total_energy_consumed_gwh numeric,
	total_renewable numeric,
	energy_difference numeric	
);


select * from energy_comparison;

-- drop table if exists and create geo_data table
DROP TABLE geo_data;
CREATE TABLE geo_data (
	id serial primary key not null,
	abbr varchar(20),
	lattitude numeric,
	longitude numeric, 
	state varchar(30)	
);

-- join geo_data table with energy_comparison 
SELECT ec.id, ec.rank,ec.state, ec.total_energy_consumed_gwh,
ec.total_renewable, ec.energy_difference, gd.lattitude, gd.longitude
FROM geo_data AS gd
JOIN energy_comparison AS ec
ON gd.state = ec.state

-- drop the energy_comparison table and create a new table with lat and long data
DROP TABLE energy_comparison;
CREATE TABLE energy_comparison(
	id serial primary key not null,
	rank numeric,
	state varchar(30),
	total_energy_consumed_gwh numeric,
	total_renewable numeric,
	energy_difference numeric, 
	lattitude numeric, 
	longitude numeric	
);

