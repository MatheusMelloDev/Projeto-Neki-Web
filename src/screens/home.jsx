import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/authContext';
import { registerSkills, getSkills } from '../services/apiService';
import { Button, Modal, Form, Alert, Col, Row, Card, ListGroup } from 'react-bootstrap';
import './home.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ nome: '', descricao: '', tecnologia: '' });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const { user } = useContext(AuthContext);

  const skillNames = ['Desenvolvimento Backend', 'Desenvolvimento Frontend', 'Desenvolvimento Fullstack', 'Banco de Dados'];
  const descriptions = ['Manutenção de Código', 'Desenvolvimento de APIs', 'Desenvolvimento de Interfaces', 'Modelagem de Dados'];
  const technologies = ['Java', 'React', 'Node.js', 'SQL'];

  const DEFAULT_IMAGE_URL = 'https://url-da-logo-da-neki.com/logo.png'; // URL da logo da Neki

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getSkills();
        setSkills(Array.isArray(skillsData) ? skillsData : []);
      } catch (error) {
        console.error('Failed to fetch skills', error);
        setSkills([]); // Set skills to an empty array in case of an error
      }
    };

    fetchSkills();
  }, [user]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setAlert({ show: false, message: '', variant: '' }); // Reset alert when modal is closed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skill = await registerSkills({ ...newSkill, userId: user.id });
      setSkills((prevSkills) => [...prevSkills, skill]);
      setAlert({ show: true, message: 'Skill cadastrada com sucesso!', variant: 'success' });
      setNewSkill({ nome: '', descricao: '', tecnologia: '' });
      handleCloseModal();
    } catch (error) {
      setAlert({ show: true, message: 'Erro ao cadastrar skill. Tente novamente.', variant: 'danger' });
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Bem-vindo à aplicação Neki</h2>
        <p>Esta aplicação permite que você gerencie suas skills.</p>
        <Button variant="primary" onClick={handleShowModal}>
          Cadastrar Skill
        </Button>

        <Row className="mt-4">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <Col md={4} key={skill.id || index}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={DEFAULT_IMAGE_URL} alt={skill.nome} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{skill.nome}</Card.Title>
                    <Card.Text>{skill.descricao}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>{skill.tecnologia}</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            ))
          ) : (
            <p>Nenhuma skill cadastrada.</p>
          )}
        </Row>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
              {alert.message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control as="select" name="nome" value={newSkill.nome} onChange={handleInputChange} required>
                <option value="">Selecione um nome</option>
                {skillNames.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="select" name="descricao" value={newSkill.descricao} onChange={handleInputChange} required>
                <option value="">Selecione uma descrição</option>
                {descriptions.map((desc, index) => (
                  <option key={index} value={desc}>{desc}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTecnologia">
              <Form.Label>Tecnologia</Form.Label>
              <Form.Control as="select" name="tecnologia" value={newSkill.tecnologia} onChange={handleInputChange} required>
                <option value="">Selecione uma tecnologia</option>
                {technologies.map((tech, index) => (
                  <option key={index} value={tech}>{tech}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
