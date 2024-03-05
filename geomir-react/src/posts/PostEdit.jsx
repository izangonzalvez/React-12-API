import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PostEdit() {
    const { id } = useParams();
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postEspecifico = posts.find(element => element.id == id);
    const [formData, setFormData] = useState(postEspecifico || {});
    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPosts = posts.map(post => (post.id === id ? formData : post));
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        navigate(-1);
    }

    return (
        <>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                {/* Campos del formulario para editar datos del Post */}
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
                {/* Los campos de latitud y longitud están deshabilitados para la edición del usuario */}
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
                {/* Campo de selección para la visibilidad del post */}
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
