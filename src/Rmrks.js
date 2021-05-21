import React, { useEffect, useState } from 'react';
import { Table, Grid } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';

import { Consolidator, RemarkListener } from 'rmrk-tools';

export default function Main(props) {
    const { api } = useSubstrate();
    const [rmrks, setRmrks] = useState({ collections: [], nfts: [], invalid: [] });
    useEffect(() => {
        let allRemarks = [];
        const consolidateFunction = (remarks) => {
            const consolidator = new Consolidator(2);
            allRemarks = allRemarks.concat(remarks);
            return consolidator.consolidate(allRemarks);
        };
    
        const listener = new RemarkListener({ polkadotApi: api, prefixes: ['0x726d726b', '0x524d524b'], consolidateFunction });
        const subscriber = listener.initialiseObservable();
        subscriber.subscribe(remarks => {
            console.log('From subscriber', remarks);
            setRmrks(remarks);
            console.log('State', rmrks);
        });
    }, []);

    return (
        <Grid.Column>
            <h1>RMRKs</h1>
            <Table celled striped size='small'>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Collection ID</strong>
                        </Table.Cell>
                    </Table.Row>
                    {rmrks.collections.forEach(collection =>
                        <Table.Row key={collection.id}>
                            <Table.Cell>{collection.id}</Table.Cell>
                        </Table.Row>
                    )}
                    <Table.Row>
                        <Table.Cell>
                            <strong>Token SN</strong>
                        </Table.Cell>
                    </Table.Row>
                    {rmrks.nfts.forEach(nft =>
                        <Table.Row key={nft.sn}>
                            <Table.Cell>{nft.sn}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Grid.Column>
    );
}
