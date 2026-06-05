import { Modal, Button } from "react-bootstrap";

export default function DirectorModals({ form, modal, handleInsert, handleUpdate, handleDelete }) {
  const { nombres, setNombres, peliculas, setPeliculas, iddirector } = form;
  const { modalInsert, setModalInsert, modalUpdate, setModalUpdate, modalDelete, setModalDelete } = modal;
  return (
    <>
      {/* ================= MODAL INSERTAR ================= */}
      <Modal show={modalInsert} onHide={() => setModalInsert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 fw-bold">Nuevo Director</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleInsert}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label fw-medium text-secondary">Nombre del Director</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Christopher Nolan"
                value={nombres}
                required
                onChange={(event) => setNombres(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium text-secondary">Nombre de la Película</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Interstellar"
                value={peliculas}
                required
                onChange={(event) => setPeliculas(event.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="px-3" onClick={() => setModalInsert(false)}>
              Cerrar
            </Button>
            <Button variant="primary" className="px-4" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* ================= MODAL ACTUALIZAR ================= */}
      <Modal show={modalUpdate} onHide={() => setModalUpdate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 fw-bold">Actualizar Director</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUpdate}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label fw-medium text-secondary">ID Director</label>
              <input
                type="text"
                className="form-control bg-light"
                value={iddirector}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium text-secondary">Nombre del Director</label>
              <input
                type="text"
                className="form-control"
                value={nombres}
                required
                onChange={(event) => setNombres(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium text-secondary">Nombre de la Película</label>
              <input
                type="text"
                className="form-control"
                value={peliculas}
                required
                onChange={(event) => setPeliculas(event.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="px-3" onClick={() => setModalUpdate(false)}>
              Cerrar
            </Button>
            <Button variant="primary" className="px-4" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* ================= MODAL ELIMINAR ================= */}
      <Modal show={modalDelete} onHide={() => setModalDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 fw-bold">Eliminar Director</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleDelete}>
          <Modal.Body className="py-4">
            ¿Estás seguro de que deseas eliminar permanentemente al director <strong>{nombres}</strong> del catálogo de AETHER?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="px-3" onClick={() => setModalDelete(false)}>
              Cancelar
            </Button>
            <Button variant="danger" className="px-4" type="submit">
              Eliminar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
