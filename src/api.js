const url = 'https://localhost:5001/api';

export async function getAccountByEmail(email) {
    await fetch(`${url}/accounts/${email}`)
            .then(res => res.json()
            .then(account => {
                sessionStorage.setItem("idAccountMonence", account.id);
                sessionStorage.setItem("amountAccountMonence", account.amount);
                sessionStorage.setItem("emailAccountMonence", account.email);
                
                return account;
            }));
}

export async function getTransactions(accountId) {
    var transactions = [];
    await fetch(`${url}/transactions/${accountId}`)
            .then(res => res.json()
            .then(data => {
                transactions = data;
            }));

    return transactions;
}

export async function saveTransaction(accountId, amount) {
    const jsonData = JSON.stringify({ accountId, amount });
    await fetch(`${url}/transactions`, {
            method: 'post',
            mode: 'cors',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then((response) => {
            return response.data;
        }, (error) => {
            console.error(error);
        });
}

export async function getQuote() {
    var quote = {}
    await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
            .then(res => res.json()
            .then(data => quote = data));
    
    return quote;
}