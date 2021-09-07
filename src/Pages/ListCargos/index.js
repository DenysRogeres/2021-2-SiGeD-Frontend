import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import GenericListScreen from '../../Components/GenericListScreen';
import {
  H1, TableHeader, P, Bar, TableTitle,
} from './Style';
import { getUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import CargosData from '../../Components/CargosData';

const ListCargos = ({ newUser }) => {
  const { user, startModal } = useProfileUser();
  const [word, setWord] = useState();
  const [filterUsers, setFilterUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await getUser('users', startModal)
      .then((response) => setUsers(response.data))
      .catch((err) => {
        console.error(`An unexpected error ocourred while getting users. ${err}`);
      });
  };

  useEffect(() => {
    getUsers();
  }, [user, newUser]);

  useEffect(() => {
    setFilterUsers(
      users.filter((User) => User.name.toLowerCase().includes(word?.toLowerCase())),
    );
  }, [word]);

  useEffect(() => {
    setFilterUsers(users);
  }, [users]);

  const listUsers = () => {
    if (users?.length === 0) {
      return <H1>Sem resultados</H1>;
    }
    if (filterUsers?.length === 0) {
      return <H1>Sem resultados</H1>;
    }
    return filterUsers?.map((User) => (
      <CargosData
        user={User}
        key={User._id}
        getUsers={getUsers}
      />
    ));
  };

  if (!localStorage.getItem('@App:token')) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      {user ? (
        <>
          {user.role === 'admin'
            ? (
              <GenericListScreen
                ButtonTitle="Novo Cargo"
                PageTitle="Cargos"
                SearchWord={word}
                setWord={setWord}
                ListType={listUsers()}
                redirectTo="/cadastro-cargos"
              >
                <TableHeader>
                  <TableTitle width={25}>
                    <P>Nome</P>
                  </TableTitle>
                  <Bar />
                  <TableTitle width={25}>
                    <P>Identificador</P>
                  </TableTitle>
                  <Bar />
                  <TableTitle width={50}>
                    <P>Descrição</P>
                  </TableTitle>
                </TableHeader>
                <div style={{ display: 'none' }} />
              </GenericListScreen>
            )
            : <Redirect to="/nao-autorizado" />}
        </>
      )
        : <h1>Carregando...</h1>}
    </>
  );
};

export default ListCargos;
