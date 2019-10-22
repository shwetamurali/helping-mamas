import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Icon } from 'components/Shared';
import EventTable from './EventTable';
import { fetchEvents } from 'components/AdminDash/queries';
import EventCreateModal from './EventCreateModal';
import EventEditModal from './EventEditModal';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.grey9};
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  HeaderContainer: styled.div`
    width: 95%;
    max-width: 80rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,
  Button: styled(Button)`
    background: white;
    border: none;
  `
};

const EventManager = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    fetchEvents()
      .then(result => {
        if (result && result.data && result.data.events) {
          setEvents(result.data.events);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onEditClicked = () => {
    setShowEditModal(true);
  }

  const onCreateClicked = () => {
    setShowCreateModal(true);
  };

  const toggleEditModal = () => {
    setShowEditModal(prev => !prev);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  const toggleCreateModal = () => {
    setShowCreateModal(prev => !prev);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <Styled.Container>
      <Styled.HeaderContainer>
        <Styled.Button onClick={onCreateClicked}>
          <Icon color="grey3" name="add" />
          <span>Create</span>
        </Styled.Button>
        <Styled.Button onClick={onRefresh}>
          <Icon color="grey3" name="refresh" />
          <span> Refresh</span>
        </Styled.Button>
        <Styled.Button onClick={onEditClicked}>
          <Icon color="grey3" name="create" />
          <span>Edit</span>
        </Styled.Button>
      </Styled.HeaderContainer>
      <EventTable events={events} loading={loading}></EventTable>
      <EventCreateModal open={showCreateModal} toggle={toggleCreateModal} />
      <EventEditModal open={showEditModal} toggle={toggleEditModal} />
    </Styled.Container>
  );
};

export default EventManager;
