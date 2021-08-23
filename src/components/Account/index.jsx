import { Button, Input } from '@material-ui/core';
import { Component } from 'react';
import { getAccountByEmail, getTransactions, saveTransaction, getQuote } from '../../api';
import Quote from '../Quote';
import Transaction from '../Transaction';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            account: {
                id: sessionStorage.getItem("idAccountMonence"),
                email: sessionStorage.getItem("emailAccountMonence"),
                amount: sessionStorage.getItem("amountAccountMonence")
            },
            textInputAmount: "",
            boxInputAmount: false,
            boxInputAmountType: true,
            currency: 'BRL',
            language: 'pt-BR',
            transactions: [],
            showTable: false,
            quoteAmounts: {
                dolar: "",
                euro: "",
                bitcoin: "",
            }
        };
        this.changeInputAmount = this.changeInputAmount.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.quote = this.quote.bind(this);
        this.sendTransaction = this.sendTransaction.bind(this);
    }
    
    async componentDidMount() {
        await getTransactions(this.state.account.id)
                .then(res => {
                    this.setState({transactions: res.reverse(), showTable: true});
                });
    }

    changeInputAmount(e) {
        var amountUnformatted = e.target.value.replace(/\D+/g, '');
        if (amountUnformatted.length < 13) {
            this.setState({textInputAmount: new Intl.NumberFormat(this.state.language, {
                                style: 'currency',
                                currency: this.state.currency
                            }).format((amountUnformatted/100).toFixed(2))});
        }
        
        this.setState({boxInputAmount: true });
    }

    deposit(e) {
        this.setState({boxInputAmount: true, boxInputAmountType: true });
    }

    withdraw(e) {
        this.setState({boxInputAmount: true, boxInputAmountType: false });
    }

    async quote() {
        var dolarAmount, euroAmount, btcAmount;
        await getQuote().then(res => {
            let amountAccount = (this.state.account.amount.replace(/\D+/g, '')*100);
            let dolarAsk = (res.USDBRL.ask.replace(/\D+/g, ''));
            let dolarValue = amountAccount/dolarAsk;
            dolarAmount = new Intl.NumberFormat("en-US", {
                            style: 'currency',
                            currency: 'USD'}).format(dolarValue);
            let euroAsk = (res.EURBRL.ask.replace(/\D+/g, ''));
            let euroValue = amountAccount/euroAsk;
            euroAmount = new Intl.NumberFormat("de-DE", {
                            style: 'currency',
                            currency: 'EUR'}).format(euroValue);
            let btcAsk = (res.BTCBRL.ask.replace(/\D+/g, ''));
            let btcValue = (amountAccount/1000)/btcAsk;
            btcAmount = new Intl.NumberFormat("en-US", {
                            style: 'currency',
                            currency: 'BTC'}).format(btcValue);
        });

        this.setState({quoteAmounts: {dolar: dolarAmount, euro: euroAmount, bitcoin: btcAmount}});
    }

    async sendTransaction(e) {
        var amountUnformatted = (this.state.textInputAmount.replace(/\D+/g, '')/100).toFixed(2);
        if (this.state.boxInputAmountType){
            if (amountUnformatted*100 + this.state.account.amount*100 > 100000000000){
                return alert("Conta não suporta esse limite!");
            }
        } else {
            if (amountUnformatted*100 > this.state.account.amount*100){
                return alert("Digite um valor menor ou igual ao Saldo!");
            } else {
                amountUnformatted = -amountUnformatted;
            }
        }
        await (saveTransaction(this.state.account.id, amountUnformatted));
        await (getAccountByEmail(this.state.account.email));
        await getTransactions(this.state.account.id)
            .then(res => {
                this.setState({transactions: res.reverse(), showTable: true});
            });
        this.setState({boxInputAmount: false, textInputAmount: "", account: { 
            id: sessionStorage.getItem("idAccountMonence"),
            email: sessionStorage.getItem("emailAccountMonence"),
            amount: sessionStorage.getItem("amountAccountMonence") 
        }});
    }

    render() {
        return (<div>
            <h2>Saldo: {new Intl.NumberFormat(this.state.language, {
                            style: 'currency',
                            currency: this.state.currency
                        }).format(this.state.account.amount)}</h2>
            { this.state.boxInputAmount ? 
                (
                    <div>
                        <Input type="text" name="amount" placeholder="0,00" onChange={this.changeInputAmount} value={this.state.textInputAmount} />
                        <Button  size="small" variant="contained" color="default" style={{ margin:"10px" }} onClick={this.sendTransaction}>
                            { this.state.boxInputAmountType ? 
                                ("Efetuar depósito")
                                : 
                                ("Efetuar saque")
                            }
                        </Button>
                    </div>
                )
                :
                ""
            }
            <Button size="small" variant="contained" color="primary" onClick={this.deposit}>Depositar</Button>
            <Button size="small" variant="contained" color="secondary" style={{ margin:"10px" }} onClick={this.withdraw}>Sacar</Button>
            <Button size="small" variant="contained" color="default" onClick={this.quote}>Converter saldo</Button>
            <Quote quoteAmounts={ this.state.quoteAmounts } />
            <Transaction transactions={this.state.transactions} showTable={true} />
        </div>)
    }
};

export default Account;