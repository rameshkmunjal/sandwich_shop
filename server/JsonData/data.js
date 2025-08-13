export const catLetterCodes=['GR', 'PK', 'CD', 'FF' ];
export const catDigitCodes=['11', '22', '33', '44' ];

export const transLetterCodes=['purchase', 'expense'];
export const transDigitCodes=['1', '2' ];

export const brandLetterCodes=['none','dmart', 'loose', 'veeba', 'nescafe', 'snapin', 'tata', 'haldiram', 'sona', 'fresh to go', 'doritos', 'mccain', 'prasuma', 'amul', 'baker circle', 'cadbury', 'hershey', 'tops'];
export const brandDigitCodes=['00','11', '99', '12', '13', '14', '15', '16', '17' , '18', '19', '20', '21', '22', '23', '24','25', '26'];

export const measLetterCodes=['loose', '100', '200', '500', '1000', '150', '8.5', '50', '25', '4000', '900', '623','610'];
export const measDigitCodes=['00','01', '02', '05', '10', '15', '85', '50', '25', '40' , '09', '62', '61'];

export const unitLetterCodes=['gm', 'lt', 'pc' , 'kg', 'ml', 'in'];
export const unitDigitCodes=['1', '2', '3', '4', '5' ,'6'];

export const itemCatArr=[
    {category:"grocery", name:"Atta", code:'101'},
    {category:"grocery", name:"Besan", code:'102'},    
    {category:"grocery", name:"Sugar", code:'103'},
    {category:"grocery", name:"Sugar Bura", code:'104'},
    {category:"grocery", name:"Salt", code:'105'},
    {category:"grocery", name:"Rice", code:'106'},
    {category:"grocery", name:"Rajma", code:'107'},
    {category:"grocery", name:"Maida", code:'108'},
    {category:"grocery", name:"Coffee", code:'109'},
    {category:"grocery", name:"Roasted Chana", code:'110'},
    {category:"grocery", name:"Imli", code:'111'},
    {category:"grocery", name:"Soya Oil", code:'112'},
    {category:"grocery", name:"Potato Wafers", code:'113'},
    {category:"grocery", name:"Vinegar", code:'114'},
    {category:"grocery", name:"Nachos", code:'115'},
    {category:"grocery", name:"Oreo Chocolate Cookies", code:'116'},
    {category:"grocery", name:"Coffee Powder", code:'117'},
    {category:"grocery", name:"Tea Powder", code:'118'},
    {category:"grocery", name:"White Peas", code:'119'},
    {category:"grocery", name:"Groundnut", code:'120'},
    {category:"grocery", name:"Kesar", code:'121'},  
    {category:"grocery", name:"khajoor", code:'123'},
    {category:"grocery", name:"raita boondi", code:'124'},
    {category:"grocery", name:"zero sev", code:'125'},
    {category:"grocery", name:"breadcrumbs", code:'126'},
//spices
    {category:"spices", name:"turmeric powder", code:'201'},
    {category:"spices", name:"salt", code:'202'},
    {category:"spices", name:"black salt", code:'203'},
    {category:"spices", name:"kashmiri mirch powder", code:'204'},
    {category:"spices", name:"dhania powder", code:'205'},
    {category:"spices", name:"turmeric powder", code:'206'},
    {category:"spices", name:"sabut kashmiri mirch", code:'207'},
    {category:"spices", name:"sabut desi lal mirch", code:'208'},
    {category:"spices", name:"aamchur powder", code:'209'},
    {category:"spices", name:"black pepper powder", code:'210'},
    {category:"spices", name:"pav bhaji masala", code:'211'},
    {category:"spices", name:"garam masala", code:'212'},
    {category:"spices", name:"chat masala", code:'213'},
    {category:"spices", name:"sabut kali mirch", code:'214'},
    {category:"spices", name:"pizza seasoning", code:'215'},
    {category:"spices", name:"piri piri", code:'216'},
    {category:"spices", name:"chilli flakes", code:'217'},
    {category:"spices", name:"kashmiri mirch powder", code:'218'},
    {category:"spices", name:"sabut jeera", code:'219'},
    {category:"spices", name:"ginger powder", code:'220'},
    {category:"spices", name:"jeera powder", code:'221'},
    {category:"spices", name:"mustard seeds", code:'222'},
    {category:"spices", name:"hing", code:'223'},
    {category:"spices", name:"methi dana", code:'224'},
    {category:"spices", name:"saunf", code:'225'},    
    {category:"spices", name:"black pepper corn", code:'226'},

    //sauces and syrups
    {category:"sauces", name:"chocolate syrup", code:'301'},
    {category:"sauces", name:"tomato ketchup", code:'302'},
    {category:"sauces", name:"mustard sauce", code:'303'},
    {category:"sauces", name:"schezwan sauce", code:'304'},
    {category:"sauces", name:"eggless mayo", code:'305'},
    {category:"sauces", name:"caramel syrup", code:'306'},

    //frozen food
    {category:"frozen", name:"vanilla ice cream", code:'401'},
    {category:"frozen", name:"veggie fingers", code:'402'},
    {category:"frozen", name:"chilli garlic potato pops", code:'403'},
    {category:"frozen", name:"sweet corn", code:'404'},
    {category:"frozen", name:"veg spring roll", code:'405'},
    {category:"frozen", name:"tortilla wrap 8.5 inch", code:'406'},
    {category:"frozen", name:"french fries 9 mm", code:'407'},
    {category:"frozen", name:"v crispers", code:'408'},
    {category:"frozen", name:"chocolate brownie", code:'409'},
    {category:"frozen", name:"choco lava", code:'410'},
    {category:"frozen", name:"cheese corn triangles", code:'411'},
    {category:"frozen", name:"tortilla wrap", code:'412'},
    {category:"frozen", name:"veg classic momos", code:'413'},
    {category:"frozen", name:"cheese slice", code:'414'},
    {category:"frozen", name:"butter", code:'415'},
    {category:"frozen", name:"choco lava pack of 9", code:'416'},
    {category:"frozen", name:"paneer", code:'417'},
    {category:"frozen", name:"triple chocolate mousse", code:'418'},
    {category:"frozen", name:"onion ring", code:'419'},
    {category:"frozen", name:"cheese corn cigar roll", code:'420'},
    

    //packaging materials
    {category:"packaging", name:"carry bag 1", code:'501'},
    {category:"packaging", name:"carry bag 2", code:'502'},
    {category:"packaging", name:"carry bag 3", code:'503'},
    {category:"packaging", name:"tissue paper", code:'504'},    
    {category:"packaging", name:"burger box", code:'505'},    
    {category:"packaging", name:"glass bottles", code:'506'},
    {category:"packaging", name:"chat box small", code:'507'},
    {category:"packaging", name:"roll box", code:'508'},
    {category:"packaging", name:"wooden spoon big", code:'509'},
    {category:"packaging", name:"wooden spoon small", code:'510'},
    {category:"packaging", name:"gunstick 3.5'", code:'511'},
    {category:"packaging", name:"tea glasses", code:'512'},
    {category:"packaging", name:"dip box", code:'513'},
    {category:"packaging", name:"straw 10 mm", code:'514'},
    {category:"packaging", name:"straw 8 mm", code:'515'},
    {category:"packaging", name:"beverage glass 450 ml", code:'516'},
    {category:"packaging", name:"beverage glass 350 ml", code:'517'},
    {category:"packaging", name:"water glasses", code:'518'},
    {category:"packaging", name:"paper plate big", code:'519'},
    {category:"packaging", name:"paper plate small", code:'520'},
    {category:"packaging", name:"meal box 750 ml", code:'521'},
    {category:"packaging", name:"boat tray 750 ml", code:'522'},
    {category:"packaging", name:"butter paper", code:'523'},
    {category:"packaging", name:"roll box printed", code:'524'},
    
    {category:"expenses", name:"salary", code:'701'},
    {category:"expenses", name:"rent", code:'702'},
    {category:"expenses", name:"electricity", code:'703'},
    {category:"expenses", name:"fuel", code:'704'},
    {category:"expenses", name:"cartage", code:'705'},
    {category:"expenses", name:"cleansing", code:'706'},
    {category:"expenses", name:"maintenance", code:'707'},
    {category:"expenses", name:"telephone", code:'708'},
    {category:"expenses", name:"misc", code:'709'},
    {category:"expenses", name:"taxes", code:'710'},
    {category:"expenses", name:"stationery", code:'711'},
    {category:"expenses", name:"repairs", code:'712'},
    {category:"expenses", name:"kitchenware", code:'713'},
    {category:"expenses", name:"xxxxxx", code:'714'},
    {category:"expenses", name:"yyyyyy", code:'715'},


    {category:"sales", name:"sales", code:'999'},


]
    


