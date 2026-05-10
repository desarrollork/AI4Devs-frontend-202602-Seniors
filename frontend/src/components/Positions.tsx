import React, { useMemo, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Position = {
  id: number;
  title: string;
  manager: string;
  deadline: string;
  status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
};

/** Alineado con `backend/prisma/seed.ts`: solo existen 2 posiciones (ids 1 y 2) tras migrate+seed. */
const mockPositions: Position[] = [
  { id: 1, title: 'Senior Full-Stack Engineer', manager: 'RRHH LTI', deadline: '2024-12-31', status: 'Abierto' },
  { id: 2, title: 'Data Scientist', manager: 'RRHH LTI', deadline: '2024-12-31', status: 'Abierto' },
];

const MANAGER_OPTIONS = [
  { value: '', label: 'Todos los managers' },
  { value: 'RRHH LTI', label: 'RRHH LTI' },
];

const Positions: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [deadlineFilter, setDeadlineFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [managerFilter, setManagerFilter] = useState('');

  const filteredPositions = useMemo(() => {
    return mockPositions.filter((p) => {
      if (searchText.trim() && !p.title.toLowerCase().includes(searchText.trim().toLowerCase())) {
        return false;
      }
      if (deadlineFilter && p.deadline !== deadlineFilter) {
        return false;
      }
      if (statusFilter && p.status !== statusFilter) {
        return false;
      }
      if (managerFilter && p.manager !== managerFilter) {
        return false;
      }
      return true;
    });
  }, [searchText, deadlineFilter, statusFilter, managerFilter]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Posiciones</h2>
      <Row className="mb-4 g-3" as="section" aria-label="Filtros de posiciones">
        <Col md={3}>
          <Form.Group controlId="filter-title">
            <Form.Label className="small text-muted">Buscar por título</Form.Label>
            <Form.Control
              type="search"
              placeholder="Ej. Backend"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-describedby="filter-title-hint"
            />
            <span id="filter-title-hint" className="visually-hidden">
              Filtra las tarjetas cuyo título contiene el texto indicado
            </span>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="filter-deadline">
            <Form.Label className="small text-muted">Fecha límite</Form.Label>
            <Form.Control
              type="date"
              value={deadlineFilter}
              onChange={(e) => setDeadlineFilter(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="filter-status">
            <Form.Label className="small text-muted">Estado</Form.Label>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="Abierto">Abierto</option>
              <option value="Contratado">Contratado</option>
              <option value="Cerrado">Cerrado</option>
              <option value="Borrador">Borrador</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="filter-manager">
            <Form.Label className="small text-muted">Manager</Form.Label>
            <Form.Select
              value={managerFilter}
              onChange={(e) => setManagerFilter(e.target.value)}
            >
              {MANAGER_OPTIONS.map((o) => (
                <option key={o.value || 'all-m'} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {filteredPositions.length === 0 ? (
        <p className="text-center text-muted" role="status">
          No hay posiciones que coincidan con los filtros.
        </p>
      ) : (
        <Row as="section" aria-label="Listado de posiciones">
          {filteredPositions.map((position) => (
            <Col md={4} key={position.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{position.title}</Card.Title>
                  <Card.Text>
                    <strong>Manager:</strong> {position.manager}
                    <br />
                    <strong>Deadline:</strong> {position.deadline}
                  </Card.Text>
                  <span
                    className={`badge ${
                      position.status === 'Abierto'
                        ? 'bg-warning'
                        : position.status === 'Contratado'
                          ? 'bg-success'
                          : position.status === 'Borrador'
                            ? 'bg-secondary'
                            : 'bg-warning'
                    } text-white`}
                  >
                    {position.status}
                  </span>
                  <div className="d-flex justify-content-between mt-3 flex-wrap gap-2">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/positions/${position.id}`)}
                    >
                      Ver proceso
                    </Button>
                    <Button variant="secondary" type="button">
                      Editar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Positions;
