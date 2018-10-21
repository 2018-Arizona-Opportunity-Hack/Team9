import React from 'react'
import { Table } from 'semantic-ui-react'

const TableExampleStriped = () => (
  <Table striped color={"blue"}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Phone Number</Table.HeaderCell>
        <Table.HeaderCell>E-mail</Table.HeaderCell>
        <Table.HeaderCell>Contacted</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>888-8888888</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableExampleStriped