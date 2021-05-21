import { useSubstrate } from './substrate-lib';

import { Button, Grid, Form, Input } from 'semantic-ui-react';

import { NFT } from 'rmrk-tools';
import { validateNFT } from 'rmrk-tools/dist/tools/validate-remark'

export default function Main(props) {
    const { api } = useSubstrate();
    const formState = {collection: '', name: 0, instance: '', sn: ''};
    const handleInputChange = (event) => {
        formState[event.target.name] = event.target.value;
    }

    const createRmrk = () => {
        const token = new NFT(
            0,
            formState.collection,
            formState.name,
            formState.instance,
            1,
            formState.sn,
            'https://www.example.com'
        ).mintnft();

        try {
            validateNFT(token);
        } catch (e) {
            console.error(e);
        }

        api.tx.system.remark(token).signAndSend(props.accountPair);
    };

    return (
        <Grid.Column>
            <h1>Create RMRK</h1>
            <Form onSubmit={createRmrk}>
                <Form.Field onChange={handleInputChange}>
                    <label>Collection</label>
                    <Input type='text' name='collection'></Input>
                </Form.Field>
                <Form.Field onChange={handleInputChange}>
                    <label>Name</label>
                    <Input type='text' name='name'></Input>
                </Form.Field>
                <Form.Field onChange={handleInputChange}>
                    <label>Instance</label>
                    <Input type='text' name='instance'></Input>
                </Form.Field>
                <Form.Field onChange={handleInputChange}>
                    <label>SN</label>
                    <Input type='text' name='sn'></Input>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Grid.Column>
    );
}
