const cds = require('@sap/cds')

class CatalogService extends cds.ApplicationService {
    async init() {

        const { Books } = cds.entities('my.bookshop')

        this.after('READ', 'Books', async each => {
            let stock = await SELECT `ID, stock`.from(Books, each.ID)
            console.log(stock);
        })

        this.on('incrementStock', async req => {

            const BookID = 1

            await UPDATE(Books).where('ID =', BookID)
                .set('stock +=', 1)

            let stock = await SELECT `ID, stock`.from(Books, BookID)

            req.reply({ stock: stock });
        })

        return super.init()
    }

}

module.exports = { CatalogService }