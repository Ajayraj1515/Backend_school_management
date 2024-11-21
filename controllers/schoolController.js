const { addSchool, getAllSchools } = require('../models/schoolModel');
const calculateDistance = require('../utils/distanceCalculator');

const addSchoolHandler = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await addSchool(name, address, parseFloat(latitude), parseFloat(longitude));
        res.status(201).json({ message: 'School added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

const listSchoolsHandler = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const schools = await getAllSchools();
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = schools.map((school) => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

module.exports = { addSchoolHandler, listSchoolsHandler };
