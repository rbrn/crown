import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRecieverSupplier } from 'app/shared/model/reciever-supplier.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './reciever-supplier.reducer';

export interface IRecieverSupplierDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecieverSupplierDeleteDialog = (props: IRecieverSupplierDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/reciever-supplier');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.recieverSupplierEntity.id);
  };

  const { recieverSupplierEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="crownApp.recieverSupplier.delete.question">
        <Translate contentKey="crownApp.recieverSupplier.delete.question" interpolate={{ id: recieverSupplierEntity.id }}>
          Are you sure you want to delete this RecieverSupplier?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-recieverSupplier" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ recieverSupplier }: IRootState) => ({
  recieverSupplierEntity: recieverSupplier.entity,
  updateSuccess: recieverSupplier.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecieverSupplierDeleteDialog);
