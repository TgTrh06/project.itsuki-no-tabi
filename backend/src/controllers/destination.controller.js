import { Destination } from "../models/destination.model";

export const getAllDestinations = async (req, res) => {
    const destinations = await Destination.find();

    res.json(destinations);
};

export const getDestinationBySlug = async (req, res) => {
    const { slug } = req.params;
    
    const destination = await Destination.findOne({ slug }).populate("articles");
    if (!destination) return res.status(404).json({ message: "Not found" });

    res.json(destination);
};