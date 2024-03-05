import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PlaceEdit() {
    const { id } = useParams();
    let places = JSON.parse(localStorage.getItem("places")) || [];
    let placeEspecifico = places.find(element => element.id == id);
    const [formData, setFormData] = useState(placeEspecifico || {});
    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPlaces = places.map(place => (place.id === id ? formData : place));
        localStorage.setItem('places', JSON.stringify(updatedPlaces));
        navigate(-1);
    }

    return (
        <>
            <h2>Edit Place</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="upload"
                    value={formData.upload || ''}
                    onChange={handleChange}
                    placeholder="Upload"
                />
                <input
                    type="number"
                    name="latitude"
                    value={formData.latitude || ''}
                    onChange={handleChange}
                    placeholder="Latitude"
                    disabled
                />
                <input
                    type="number"
                    name="longitude"
                    value={formData.longitude || ''}
                    onChange={handleChange}
                    placeholder="Longitude"
                    disabled
                />
                <select
                    name="visibility"
                    value={formData.visibility || ''}
                    onChange={handleChange}
                >
                    <option value="1">Public</option>
                    <option value="2">Contacts</option>
                    <option value="3">Private</option>
                </select>

                <button type="submit">Save Changes</button>
            </form>
        </>
    );
}