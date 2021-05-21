import {u8aToHex} from '@polkadot/util';
import { useSubstrate } from './substrate-lib';

import { Button, Grid, Form, Input } from 'semantic-ui-react';

import { Collection } from 'rmrk-tools';
import { validateCollection } from 'rmrk-tools/dist/tools/validate-remark'

export default function Main(props) {
    const { api } = useSubstrate();
    const formState = {name: '', max: 0, symbol: ''}
    const handleInputChange = (event) => {
        formState[event.target.name] = event.target.value;
    }

    const createCollection = () => {
        const colllection = new Collection(
            0,
            formState.name,
            parseInt(formState.max),
            props.accountPair.address,
            formState.symbol,
            Collection.generateId(u8aToHex(props.accountPair.address), formState.symbol),
            'https://www.example.com'
        ).mint();

        try {
            validateCollection(colllection);
        } catch (e) {
            console.error(e);
        }

        api.tx.system.remark(colllection).signAndSend(props.accountPair);
    };

    return (
        <Grid.Column>
            <h1>Create Collection</h1>
            <Form onSubmit={createCollection}>
                <Form.Field onChange={handleInputChange}>
                    <label>Name</label>
                    <Input type='text' name='name'></Input>
                </Form.Field>
                <Form.Field onChange={handleInputChange}>
                    <label>Max</label>
                    <Input type='number' name='max'></Input>
                </Form.Field>
                <Form.Field onChange={handleInputChange}>
                    <label>Symbol</label>
                    <Input type='text' name='symbol'></Input>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Grid.Column>
    );
}
