import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRecieverResource } from 'app/shared/model/reciever-resource.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './reciever-resource.reducer';

export interface IRecieverResourceDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecieverResourceDeleteDialog = (props: IRecieverResourceDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/reciever-resource');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.recieverResourceEntity.id);
  };

  const { recieverResourceEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="crownApp.recieverResource.delete.question">
        <Translate contentKey="crownApp.recieverResource.delete.question" interpolate={{ id: recieverResourceEntity.id }}>
          Are you sure you want to delete this RecieverResource?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-recieverResource" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ recieverResource }: IRootState) => ({
  recieverResourceEntity: recieverResource.entity,
  updateSuccess: recieverResource.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecieverResourceDeleteDialog);
