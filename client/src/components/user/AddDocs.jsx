import React, { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DoctorList from './DoctorList';

const AddDocs = () => {
    const [search, setSearch] = useState('');
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:8001/api/user/getalldoctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
            message.error('Something went wrong while fetching doctors');
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.fullName.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            <h2 className='text-center p-3'>Search Doctors</h2>
            <Row className='mb-3'>
                <Col md={{ span: 6, offset: 3 }}>
                    <Input
                        placeholder='Search by Name or Specialization'
                        value={search}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Row>
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                        <Col key={doctor._id} md={4} className='mb-3'>
                            <DoctorList doctor={doctor} userdata={localStorage.getItem('userData')} />
                        </Col>
                    ))
                ) : (
                    <p className='text-center'>No doctors found</p>
                )}
            </Row>
        </Container>
    );
};

export default AddDocs;
