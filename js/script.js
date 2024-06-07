new Vue({
    el: '#app',
    data: {
        // Initial data properties
        current: '0.00',
        exp: 0,
        inc: 0,
        total: 0,
        currentColor: '#bec8e4',
        empty: true,
        incomeBtn: true,
        icon: 'attach_money',
        text: 'Salary',
        class: 'icon-1',
        type: '',
        color: '#a9e61c',
        transaction: [],
        details: []
    },
    methods: {
        // Calculate balance
        balance() {
            if (this.inc % 1 === 0 && this.exp % 1 === 0) {
                this.total = this.inc - this.exp;
            } else {
                this.total = (this.inc - this.exp).toFixed(2);
            }
        },
        // Handle number button press
        pressed(e) {
            let key = e.target.innerText;
            if (this.current === '0.00') {
                this.current = '';
            }
            if (this.current.length >= 6) {
                this.current = 'error!';
            }
            this.current += key;
            this.currentColor = '#5b657a';
        },
        // Clear the current input
        clear() {
            this.current = '0.00';
            this.currentColor = '#bec8e4';
        },
        // Add transaction
        add() {
            if (this.current == 0 || this.current.length > 6) {
                console.log('error');
            } else if (this.incomeBtn) {
                this.transaction.unshift(+this.current);
                this.color = '#a9e61c';
                this.type = '+';
                this.template();

                if (this.current % 1 === 0) {
                    this.inc = Number(this.inc) + Number(this.current);
                } else {
                    this.inc = (Number(this.inc) + Number(this.current)).toFixed(2);
                }

                this.current = '0.00';
                this.currentColor = '#bec8e4';
                this.balance();

            } else if (!this.incomeBtn) {
                this.transaction.unshift(-this.current);
                this.color = '#ff6fb7';
                this.type = '-';
                this.template();

                if (this.current % 1 === 0) {
                    this.exp = Number(this.exp) + Number(this.current);
                } else {
                    this.exp = (Number(this.exp) + Number(this.current)).toFixed(2);
                }

                this.current = '0.00';
                this.balance();
            }
            this.isEmpty();
        },
        // Delete a transaction
        deleteTarget(index) {
            if (this.transaction[index] < 0) {
                if (this.transaction[index] % 1 === 0) {
                    this.exp = Number(this.exp) + Number(this.transaction[index]);
                } else if (this.transaction[index] % 1 !== 0) {
                    this.exp = (Number(this.exp) + Number(this.transaction[index])).toFixed(2);
                }
            } else if (this.transaction[index] > 0) {
                if (this.transaction[index] % 1 === 0) {
                    this.inc = Number(this.inc) - Number(this.transaction[index]);
                } else if (this.transaction[index] % 1 !== 0) {
                    this.inc = (Number(this.inc) - Number(this.transaction[index])).toFixed(2);
                }
            }

            this.transaction.splice(index, 1);
            this.balance();
            this.details.splice(index, 1);
            this.isEmpty();
        },
        // Create a transaction template
        template() {
            let template = `
                <div class="transaction__type ${this.class}" value="${this.current}">
                    <span class="material-icons">${this.icon}</span>
                    <p>${this.text}</p>
                </div>
                <div class="transaction__price">
                    <p style="color: ${this.color}">${this.type} ${this.current}</p>
                    <button class="transaction__bin">
                    <span class="material-icons">delete</span>
                    </button>
                </div>`;
            this.details.unshift(template);
        },
        // Select an item type
        selectedItem(e) {
            this.icon = e.target.firstChild.innerText;
            this.text = e.target.lastChild.innerText;
            this.class = e.target.className;
        },
        // Switch between income and expense tabs
        selectedTab(id) {
            if (id === 1) {
                this.incomeBtn = true;
                this.$refs.defaultInc.checked = true;
                this.icon = 'attach_money';
                this.text = 'Salary';
                this.class = 'icon-1';
            } else if (id === 2) {
                this.incomeBtn = false;
                this.$refs.defaultExp.checked = true;
                this.icon = 'home';
                this.text = 'Rent';
                this.class = 'icon-1';
            }
        },
        // Check if there are no transactions
        isEmpty() {
            this.empty = this.details.length === 0;
        }
    }
});
