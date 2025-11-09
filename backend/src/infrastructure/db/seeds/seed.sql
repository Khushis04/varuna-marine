-- ✅ TRUNCATE IN THE CORRECT ORDER
TRUNCATE TABLE ship_routes CASCADE;
TRUNCATE TABLE pool_members CASCADE;
TRUNCATE TABLE pools CASCADE;
TRUNCATE TABLE bank_entries CASCADE;
TRUNCATE TABLE ship_compliance CASCADE;
TRUNCATE TABLE routes CASCADE;

INSERT INTO routes (route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption, distance_km, total_emissions, is_baseline)
VALUES
('R001', 'Container',   'HFO', 2024, 91.0, 5000, 12000, 4500, TRUE),
('R002', 'BulkCarrier', 'LNG', 2024, 88.0, 4800, 11500, 4200, FALSE),
('R003', 'Tanker',      'MGO', 2024, 93.5, 5100, 12500, 4700, FALSE),
('R004', 'RoRo',        'HFO', 2025, 89.2, 4900, 11800, 4300, FALSE),
('R005', 'Container',   'LNG', 2025, 90.5, 4950, 11900, 4400, FALSE);

INSERT INTO ship_routes (ship_id, route_id, year)
VALUES
('S1', 'R004', 2025),
('S1', 'R005', 2025),
('S2', 'R003', 2024);

INSERT INTO routes (route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption, distance_km, total_emissions)
VALUES ('R900', 'Container', 'LNG', 2025, 10, 1000, 10000, 500);

INSERT INTO ship_routes (ship_id, route_id, year)
VALUES ('GOOD1', 'R900', 2025);

