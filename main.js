const totalCost = document.querySelector ('#total-cost'),
      anInitialFee = document.querySelector ('#an-initial-fee'),
      creditTerm = document.querySelector ('#credit-term');


const totalCostRange = document.querySelector ('#total-cost-range'),
      anInitialFeeRange = document.querySelector ('#an-initial-fee-range'),
      creditTermRange = document.querySelector ('#credit-term-range');


const totalAmountOfCredit = document.querySelector ('#amount-of-credit'),
      totalMonthlyPayment = document.querySelector ('#monthly-payment'),
      totalRecommendedIncome = document.querySelector ('#recommended-income');


const inputsRange = document.querySelectorAll('.input-range');
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}

assignValue();

const banks = [

    {
        name: 'alfa',
        precents: 8.7
    },
    {
        name: 'sberbank',
        precents: 8.4
    },
    {
        name: 'pochta',
        precents: 7.9
    },
    {
        name: 'tinkoff',
        precents: 9.2
    }

];

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
    bank.addEventListener('click', ()=> {
        for(let item of bankBtns){
            item.classList.remove('active');
        };
        bank.classList.add('active');
        takeActiveBank(bank);

    });
};

const takeActiveBank = currentActive => { 
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find( bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precents;
    calculation(totalCost.value , anInitialFee.value, creditTerm.value);

};

for (let input of inputsRange){
    input.addEventListener('input', () =>{
        assignValue();
        calculation(totalCost.value , anInitialFee.value, creditTerm.value);
    });
};


const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    let monthlyPayment; // Ежемесяный
    let lounAmont = totalCost - anInitialFee; // Размер кредита (Стоимость - Первоначальный взнос)
    let interestRate = currentPrecent; // Процентная ставка
    let numberOfYears = creditTerm; // Количество лет
    let numberOfMonths = 12 * numberOfYears; // Количество месяцев

    monthlyPayment = (lounAmont + (((lounAmont / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
    const monthlyPaymentArounded = Math.round(monthlyPayment);
    if (monthlyPaymentArounded < 0){
        return false
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmont} ₽`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded/ 100) * 35)} ₽`;
    }    
 
}