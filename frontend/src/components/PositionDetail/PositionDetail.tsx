import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { usePositionKanban } from '../../hooks/usePositionKanban';
import KanbanBoard from './KanbanBoard';

const PositionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const positionId = id != null && id !== '' ? Number(id) : NaN;

  const {
    positionName,
    steps,
    candidatesByStep,
    loading,
    error,
    dropError,
    setDropError,
    moveCandidate,
  } = usePositionKanban(positionId);

  if (loading) {
    return (
      <Container className="mt-5 text-center" aria-busy="true">
        <Spinner animation="border" role="status" aria-label="Cargando datos de la posición" />
        <p className="mt-2 text-muted">Cargando posición...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-secondary" onClick={() => navigate('/positions')}>
          ← Volver a posiciones
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4 px-4">
      <main aria-labelledby="position-detail-title">
        <div className="d-flex align-items-center mb-4 gap-3 flex-wrap">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => navigate('/positions')}
            aria-label="Volver al listado de posiciones"
          >
            ←
          </Button>
          <h2 id="position-detail-title" className="mb-0">
            {positionName}
          </h2>
        </div>

        {dropError && (
          <Alert variant="warning" dismissible onClose={() => setDropError(null)} role="alert">
            {dropError}
          </Alert>
        )}

        <KanbanBoard
          steps={steps}
          candidatesByStep={candidatesByStep}
          onDrop={moveCandidate}
        />
      </main>
    </Container>
  );
};

export default PositionDetail;
