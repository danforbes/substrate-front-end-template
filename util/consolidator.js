const { fetchRemarks, getRemarksFromBlocks, getLatestFinalizedBlock, Consolidator } = require('rmrk-tools');
const { ApiPromise, WsProvider } = require('@polkadot/api');

const wsProvider = new WsProvider('ws://127.0.0.1:9944');

const fetchAndConsolidate = async () => {
    try {
        const api = await ApiPromise.create({ provider: wsProvider });
        const to = await getLatestFinalizedBlock(api);

        const remarkBlocks = await fetchRemarks(api, 0, to, ['0x726d726b', '0x524d524b']);
        if (remarkBlocks && remarkBlocks.length > 0) {
          const remarks = getRemarksFromBlocks(remarkBlocks, ['0x726d726b', '0x524d524b']);
          const consolidator = new Consolidator(2);
          const consolidatedRemarks = await consolidator.consolidate(remarks);
          const { nfts, collections, invalid } = consolidatedRemarks;
          console.log('Consolidated nfts:', nfts);
          console.log('Consolidated collections:', collections);
          console.log('Invalid remarks:', invalid);
        } else {
            console.log('No RMRKs');
        }
    } catch (error) {
        console.log(error)
    }
}

fetchAndConsolidate().catch(console.error).then(process.exit);
