export const cities = [
    "Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat"
];

export const citiesWithLabelValue = cities.map(city => ({
    label: city,
    value: city.toLowerCase() // Assuming value should be in lowercase
}));

export const prefOptions = [
    {
        label: "On - Site",
        value: "onsite",
    },
    {
        label: "Hybrid",
        value: "hybrid",
    },
    {
        label: "Remote",
        value: "remote",
    },
]

export const availibilityOptions = [
    {
        label: "Less then 1 month",
        value: "Less then 1 month"
    },
    {
        label: "1 Month",
        value: "1 Month"
    },
    {
        label: "2 Months",
        value: "2 Months"
    },
    {
        label: "More then 2 Months",
        value: "More then 2 Months"
    },
]

export const educationOption = [
    {
        label: "Intermediate",
        value: "Intermediate"
    },
    {
        label: "Bachelor",
        value: "Bachelor"
    },
    {
        label: "Master",
        value: "Master"
    },
]

export const field = [
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Hardware Design', label: 'Hardware Design' },
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
];


export const subField = {
    ['Software Engineering']: [
        { value: 'Principal Engineer', label: 'Principal Engineer' },
        { value: 'Cyber Security Engineer', label: 'Cyber Security Engineer' },
        { value: 'SQA Engineer', label: 'SQA Engineer' },
        { value: 'Python Developers', label: 'Python Developers' },
        { value: 'Dot Net Developer', label: 'Dot Net Developer' },
        { value: 'Full-Stack Developer', label: 'Full-Stack Developer' },
        { value: 'LUA Developer', label: 'LUA Developer' },
    ],
    ['Hardware Design']: [
        { value: 'Hardware Designer', label: 'Hardware Designer' },
        { value: 'Design Engineer', label: 'Design Engineer' },
        { value: 'Firmware Engineer', label: 'Firmware Engineer' },
        { value: 'Embedded Firmware Engineer', label: 'Embedded Firmware Engineer' },
        { value: 'Hardware Test Engineer', label: 'Hardware Test Engineer' },
        { value: 'Circuit Design Engineer', label: 'Circuit Design Engineer' },
        { value: 'Hardware Architect', label: 'Hardware Architect' },
        { value: 'Digital Design Engineer', label: 'Digital Design Engineer' },
        { value: 'System-on-Chip (SoC) Architect', label: 'System-on-Chip (SoC) Architect' },
        { value: 'Hardware/Software Co-Design Engineer', label: 'Hardware/Software Co-Design Engineer' },
        { value: 'Hardware/Software Integration Engineer', label: 'Hardware/Software Integration Engineer' },
        { value: 'Hardware/Software Integration Engineer', label: 'Hardware/Software Integration Engineer' },
        { value: 'System Software Engineer', label: 'System Software Engineer' },
        { value: 'Hardware-Driven Software Developer', label: 'Hardware-Driven Software Developer' },
        { value: 'PCB Designer', label: 'PCB Designer' }
    ],
    ['Mechanical']: [
        { value: 'Mechanical Designer', label: 'Mechanical Designer' },
        { value: 'Mechanical Design Engineer', label: 'Mechanical Design Engineer' },
        { value: 'Design Engineer', label: 'Design Engineer' },
        { value: '3D Designer', label: '3D Designer' },
        { value: '3D Visualizer', label: '3D Visualizer' },
        { value: '3D Motion Designer', label: '3D Motion Designer' },
        { value: 'Simulation Engineer', label: 'Simulation Engineer' },
        { value: 'Assistant Mechanical Engineer', label: 'Assistant Mechanical Engineer' },
        { value: 'MEP Engineer', label: 'MEP Engineer' },
        { value: 'Mechatronics Engineer', label: 'Mechatronics Engineer' },
        { value: 'Robotics Design Engineer', label: 'Robotics Design Engineer' },
        { value: 'Sr. Mechanical Designer', label: 'Sr. Mechanical Designer' },
        { value: 'CAD Expert', label: 'CAD Expert' },
        { value: '3D Renderings Expert', label: '3D Renderings Expert' },
        { value: 'CAD Specialist', label: 'CAD Specialist' },
        { value: '2D and 3D CAD Specialist', label: '2D and 3D CAD Specialist' },
        { value: 'Floor Plan Maker', label: 'Floor Plan Maker' },
        { value: 'HVAC Project Engineer', label: 'HVAC Project Engineer' },
        { value: 'Product Designer', label: 'Product Designer' },
        { value: 'P&ID Designer', label: 'P&ID Designer' },
        { value: 'P&ID Specialist', label: 'P&ID Specialist' },
        { value: 'Sr. Design Engineer', label: 'Sr. Design Engineer' },
        { value: 'Revit Designer', label: 'Revit Designer' }
    ],
    ['Human Resources']: [
        { value: 'Director Human Resource', label: 'Director Human Resource' },
        { value: 'Director Talent Acquisition', label: 'Director Talent Acquisition' },
        { value: 'Manager Human Resource', label: 'Manager Human Resource' },
        { value: 'Manager Talent Acquisition', label: 'Manager Talent Acquisition' },
        { value: 'Assistant HR Manager', label: 'Assistant HR Manager' },
        { value: 'Assistant HR Officer', label: 'Assistant HR Officer' },
        { value: 'HR Executive', label: 'HR Executive' },
        { value: 'Recruitment Specialist/Recruiter', label: 'Recruitment Specialist/Recruiter' },
        { value: 'Workforce Planning and Talent Management Specialist', label: 'Workforce Planning and Talent Management Specialist' },
        { value: 'HR Generalist', label: 'HR Generalist' },
        { value: 'Employee Relations Specialist', label: 'Employee Relations Specialist' },
        { value: 'Learning and Development Specialist', label: 'Learning and Development Specialist' },
        { value: 'Compensation and Benefits Analyst', label: 'Compensation and Benefits Analyst' },
        { value: 'HR Business Partner', label: 'HR Business Partner' },
        { value: 'Organizational Development (OD) Consultant', label: 'Organizational Development (OD) Consultant' },
        { value: 'HR Compliance Specialist', label: 'HR Compliance Specialist' },
        { value: 'Benefits Administrator', label: 'Benefits Administrator' },
        { value: 'Employee Engagement Specialist', label: 'Employee Engagement Specialist' },
        { value: 'HR Compliance Auditor', label: 'HR Compliance Auditor' },
        { value: 'HR Training Coordinator', label: 'HR Training Coordinator' },
        { value: 'Labor Relations Specialist', label: 'Labor Relations Specialist' },
        { value: 'Employee Experience Specialist', label: 'Employee Experience Specialist' }
    ],
    ['Marketing']: [
        { value: 'Marketing Director', label: 'Marketing Director' },
        { value: 'Marketing Manager', label: 'Marketing Manager' },
        { value: 'Marketing Executive', label: 'Marketing Executive' },
        { value: 'Brand Manager', label: 'Brand Manager' },
        { value: 'Digital Marketing Specialist', label: 'Digital Marketing Specialist' },
        { value: 'LinkedIn Marketing Specialist', label: 'LinkedIn Marketing Specialist' },
        { value: 'Content Marketing Manager', label: 'Content Marketing Manager' },
        { value: 'Social Media Manager', label: 'Social Media Manager' },
        { value: 'Public Relations (PR) Manager', label: 'Public Relations (PR) Manager' },
        { value: 'Performance Marketer', label: 'Performance Marketer' },
        { value: 'Market Research Analyst', label: 'Market Research Analyst' },
        { value: 'Marketing Communications Manager', label: 'Marketing Communications Manager' },
        { value: 'Product Marketing Manager', label: 'Product Marketing Manager' },
        { value: 'Event Marketing Manager', label: 'Event Marketing Manager' },
        { value: 'Email Marketing Specialist', label: 'Email Marketing Specialist' },
        { value: 'Marketing Analytics Manager', label: 'Marketing Analytics Manager' },
        { value: 'Creative Director', label: 'Creative Director' },
        { value: 'SEO Specialist', label: 'SEO Specialist' },
        { value: 'Demand Generation Specialist', label: 'Demand Generation Specialist' },
        { value: 'E-Commerce Specialist', label: 'E-Commerce Specialist' },
        { value: 'Channel Marketing Manager', label: 'Channel Marketing Manager' },
        { value: 'Influencer Marketing Manager', label: 'Influencer Marketing Manager' },
        { value: 'Marketing Automation Specialist', label: 'Marketing Automation Specialist' },
        { value: 'Search Engine Marketing (SEM) Specialist', label: 'Search Engine Marketing (SEM) Specialist' },
        { value: 'Customer Marketing Manager', label: 'Customer Marketing Manager' },
        { value: 'Retail Marketing Manager', label: 'Retail Marketing Manager' },
        { value: 'Brand Partnerships Manager', label: 'Brand Partnerships Manager' },
        { value: 'Customer Experience Manager', label: 'Customer Experience Manager' },
        { value: 'Marketing Content Specialist', label: 'Marketing Content Specialist' },
        { value: 'Marketing Operations Specialist', label: 'Marketing Operations Specialist' },
        { value: 'Marketing Operations Manager', label: 'Marketing Operations Manager' },
        { value: 'Marketing Data Scientist', label: 'Marketing Data Scientist' },
        { value: 'Marketing Compliance Officer', label: 'Marketing Compliance Officer' },
        { value: 'Email Marketer', label: 'Email Marketer' },
        { value: 'Affiliate Marketing Manager', label: 'Affiliate Marketing Manager' },
        { value: 'Experiential Marketing Manager', label: 'Experiential Marketing Manager' },
        { value: 'Market Development Manager', label: 'Market Development Manager' },
        { value: 'Brand Strategist', label: 'Brand Strategist' },
        { value: 'Marketing Copywriter', label: 'Marketing Copywriter' },
        { value: 'Content Writer', label: 'Content Writer' },
        { value: 'Technical Content Writer', label: 'Technical Content Writer' },
        { value: 'Inbound Marketing Manager', label: 'Inbound Marketing Manager' },
        { value: 'Marketing Channel Analyst', label: 'Marketing Channel Analyst' },
        { value: 'PPC Expert', label: 'PPC Expert' },
        { value: 'Product Researcher', label: 'Product Researcher' },
        { value: 'Marketing Compliance Specialist', label: 'Marketing Compliance Specialist' },
        { value: 'Mobile Marketing Manager', label: 'Mobile Marketing Manager' },
        { value: 'Video Editor', label: 'Video Editor' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Graphic Designer', label: 'Graphic Designer' }
    ],
    ['Sales']: [
        { value: 'Sales Representative/Sales Executive', label: 'Sales Representative/Sales Executive' },
        { value: 'Business Development Manager', label: 'Business Development Manager' },
        { value: 'Business Development Executive', label: 'Business Development Executive' },
        { value: 'Freelance Bidder', label: 'Freelance Bidder' },
        { value: 'Lead Generation', label: 'Lead Generation' },
        { value: 'Sales Representative', label: 'Sales Representative' },
        { value: 'Sales Development Representative', label: 'Sales Development Representative' },
        { value: 'Sales Manager', label: 'Sales Manager' },
        { value: 'Inside Sales Representative', label: 'Inside Sales Representative' },
        { value: 'Outside Sales Representative', label: 'Outside Sales Representative' },
        { value: 'Sales Engineer', label: 'Sales Engineer' },
        { value: 'Sales Force Engineer', label: 'Sales Force Engineer' },
        { value: 'Channel Sales Manager', label: 'Channel Sales Manager' },
        { value: 'Salesforce Administrator', label: 'Salesforce Administrator' },
        { value: 'Sales Compensation Manager', label: 'Sales Compensation Manager' },
        { value: 'Sales Coordinator', label: 'Sales Coordinator' },
        { value: 'Sales Account Coordinator', label: 'Sales Account Coordinator' },
        { value: 'Product Marketer', label: 'Product Marketer' }
    ],
};

export const positionBysubfields = {
    ['Principal Engineer']: [
        { value: 'Technical Leadership and Vision', label: 'Technical Leadership and Vision' },
        { value: 'Architecture Design and Review', label: 'Architecture Design and Review' },
        { value: 'Innovation and Research', label: 'Innovation and Research' },
        { value: 'Technical Strategy and Roadmap', label: 'Technical Strategy and Roadmap' },
        { value: 'Quality Assurance and Continuous Improvement', label: 'Quality Assurance and Continuous Improvement' },
    ],
    ['Cyber Security Engineer']: [
        { value: 'Penetration Tester (Ethical Hacker)', label: 'Penetration Tester (Ethical Hacker)' },
        { value: 'Security Analyst', label: 'Security Analyst' },
        { value: 'Incident Responder', label: 'Incident Responder' },
        { value: 'Security Engineer (Cloud Security)', label: 'Security Engineer (Cloud Security)' },
        { value: 'Security Architect', label: 'Security Architect' },
        { value: 'Cryptographer', label: 'Cryptographer' },
        { value: 'Security Operations Center (SOC) Analyst', label: 'Security Operations Center (SOC) Analyst' }
    ],
    ['SQA Engineer']: [
        { value: 'Manual Tester', label: 'Manual Tester' },
        { value: 'Automation Engineer', label: 'Automation Engineer' },
        { value: 'Performance Tester', label: 'Performance Tester' },
        { value: 'Security Tester (Penetration Tester)', label: 'Security Tester (Penetration Tester)' },
        { value: 'Test Automation Architect', label: 'Test Automation Architect' },
        { value: 'Mobile App Tester', label: 'Mobile App Tester' },
        { value: 'Accessibility Tester', label: 'Accessibility Tester' }
    ],
    ['Python Developers']: [
        { value: 'Web Developer (Django/Flask)', label: 'Web Developer (Django/Flask)' },
        { value: 'Data Scientist', label: 'Data Scientist' },
        { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
        { value: 'Full Stack Developer (Python)', label: 'Full Stack Developer (Python)' },
        { value: 'Data Engineer', label: 'Data Engineer' },
        { value: 'DevOps Engineer (Python)', label: 'DevOps Engineer (Python)' }
    ],
    ['Dot Net Developer']: [,
        { value: 'Web Developer', label: 'Web Developer' },
        { value: 'Backend Developer', label: 'Backend Developer' },
        { value: 'Desktop Application Developer', label: 'Desktop Application Developer' },
        { value: 'Mobile App Developer', label: 'Mobile App Developer' },
        { value: 'API Developer', label: 'API Developer' },
        { value: 'Integration Developer', label: 'Integration Developer' }
    ],
    ['Full-Stack Developer']: [,
        { value: 'MEAN/MERN Stack Developer', label: 'MEAN/MERN Stack Developer' },
        { value: 'LAMP Stack Developer', label: 'LAMP Stack Developer' },
        { value: 'JAMstack Developer', label: 'JAMstack Developer' },
        { value: 'Serverless Developer', label: 'Serverless Developer' },
        { value: 'GraphQL Developer', label: 'GraphQL Developer' },
        { value: 'Microservices Developer', label: 'Microservices Developer' }
    ],
    ['LUA Developer']: [,
        { value: 'Lua Developer', label: 'Lua Developer' },
        { value: 'Game Developer', label: 'Game Developer' },
        { value: 'Scripting Engineer', label: 'Scripting Engineer' },
        { value: 'Web Developer (with Lua on the Backend)', label: 'Web Developer (with Lua on the Backend)' },
        { value: 'Network Programmer', label: 'Network Programmer' },
        { value: 'Scientific Computing and Data Analysis', label: 'Scientific Computing and Data Analysis' }
    ],
};


export const stackOptions = [
    {
        value: "mern",
        label: "MERN"
    },
    {
        value: "mean",
        label: "MEAN"
    },
    {
        value: "ror",
        label: "Ruby on Rails"
    },
    {
        value: "lamp",
        label: "LAMP"
    }
]



export const expOptions = [
    {
        value: "0-6",
        label: "0 - 6 Months"
    },
    {
        value: "6-11",
        label: "6 - 11 Months"
    },
    {
        value: "1-2year",
        label: "1 - 2 Years"
    },
    {
        value: "2-3year",
        label: "2 - 3 Years"
    },
    {
        value: "3-5years",
        label: "3 - 5 Years"
    },
    {
        value: "5-10years",
        label: "5 - 10 Years"
    },
    {
        value: "10+years",
        label: "10+ Years"
    },
]

export const techOptions = [
    {
        value: "react",
        label: "React Js"
    },
    {
        value: "angular",
        label: "Angular Js"
    },
    {
        value: "vue",
        label: "Vue Js"
    },
    {
        value: "php",
        label: "PHP"
    },
]


export const tableData = [
    {
        name: "Alice Johnson",
        date: "20-4-2024",
        designation: "Junior React Js Developer",
        status: "confirmed"
    },
    {
        name: "John Doe",
        date: "21-4-2024",
        designation: "Senior Software Engineer",
        status: "pending"
    },
    {
        name: "Jane Smith",
        date: "22-4-2024",
        designation: "UI/UX Designer",
        status: "cancelled"
    },
    {
        name: "Alice Johnson",
        date: "23-4-2024",
        designation: "Frontend Developer",
        status: "pending"
    },
    {
        name: "Bob Brown",
        date: "24-4-2024",
        designation: "Backend Developer",
        status: "confirmed"
    },
    {
        name: "Eve Lee",
        date: "25-4-2024",
        designation: "Data Scientist",
        status: "cancelled"
    },
    {
        name: "Michael Clark",
        date: "26-4-2024",
        designation: "DevOps Engineer",
        status: "confirmed"
    },
    {
        name: "Sarah Adams",
        date: "27-4-2024",
        designation: "Product Manager",
        status: "pending"
    },
    {
        name: "David Wilson",
        date: "28-4-2024",
        designation: "Quality Assurance Engineer",
        status: "confirmed"
    },
    {
        name: "Emily Taylor",
        date: "29-4-2024",
        designation: "Technical Writer",
        status: "pending"
    },
    {
        name: "Emily Taylor",
        date: "29-4-2024",
        designation: "Technical Writer",
        status: "pending"
    }
];

export const designationOptions = [
    {
        label: "React JS",
        value: "react",
    },
    {
        label: "Vue JS",
        value: "vue",
    },
    {
        label: "Angular JS",
        value: "angular",
    },
    {
        label: "Node JS",
        value: "node",
    },
    {
        label: "MERN Stack",
        value: "mern",
    },
    {
        label: "MEAN Stack",
        value: "mean",
    },
];



export const inputsData = [
    {
        label: "Name",
        type: "text",
        name: "name",
        placeholder: "Enter Name",
        tooltip: "Please enter your full legal name, including first, middle (if applicable), and last name, as it appears on your official documents. eg: Mark Zuckerberg"
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "Enter Email",
        tooltip: "Please enter your primary email address. This will be used for all official communications eg: mark@gmail.com"
    },
    {
        label: "Phone Number",
        type: "number",
        name: "phone_num",
        placeholder: "Enter Phone Number",
        tooltip: "Please enter your primary phone number. This will be used for all official communications eg: 03001234567",
        maxLength: 11
    },
    {
        label: "CNIC",
        type: "number",
        name: "cnic",
        placeholder: "Enter CNIC Number",
        tooltip: "Please enter your CNIC number as it appears on your identity card, including all dashes. eg: 42201-1234567-8",
        maxLength: 13
    },
    {
        label: "LinkedIn Profile Link",
        type: "url",
        name: "linkedin_profile",
        placeholder: "Enter LinkedIn Profile Link",
        tooltip: "Please enter the URL of your LinkedIn profile. This allows us to view your professional background and connect with you on LinkedIn. eg: https://www.linkedin.com/in/markzuckerberg"
    },
    {
        label: "Salary Expectation",
        type: "number",
        name: "salary_expection",
        placeholder: "Enter Expected Salary",
        tooltip: "Please enter your expected salary in PKR. This will help us understand your salary expectations and make you an offer accordingly. eg: 100000"
    },
    {
        type: "select",
        name: "experience",
        label: "Experience",
        placeholder: "Experience",
        tooltip: "Please enter the total number of years and months you have worked in your field.",
        options: expOptions

    },
    {
        type: "select",
        name: "availability",
        label: "Availability",
        placeholder: "Availability",
        tooltip: "Please select the earliest you can start working with us.",
        options: availibilityOptions
    },
    {
        type: "select",
        name: "prefrences",
        label: "Prefrences",
        placeholder: "Prefrences",
        tooltip: "Please select your work preferences. This will help us understand your work preferences and make you an offer accordingly.",
        options: prefOptions
    },
    {
        type: "tags",
        tooltip: "Please write the technologies you are proficient in. Also Please type # before the technology name. eg: #ReactJS, #NodeJS, #VueJS",
    },
    {
        type: "select",
        name: "education",
        label: "Education",
        placeholder: "Education",
        tooltip: "Please select your highest level of education.",
        options: educationOption
    },
    {
        label: "Github Link",
        type: "url",
        name: "github_profile",
        tooltip: "Please enter the URL of your GitHub profile. This allows us to view your projects and contributions. eg: Github.com/username",
        placeholder: "Enter Github Link"
    },
    {
        type: "select",
        name: "city",
        label: "City",
        placeholder: "City",
        tooltip: "Please select the city you are currently residing in.",
        options: citiesWithLabelValue
    },
    {
        type: "select",
        name: "field",
        label: "Field",
        placeholder: "Select Field",
        tooltip: "Please select the field you are interested in.",
        options: field

    },
    {
        type: "select",
        name: "subField",
        label: "Sub-Field",
        placeholder: "Select Sub Field",
        tooltip: "Please select the sub-field you are interested in.",
        options: subField
    },
    {
        type: "select",
        name: "position",
        label: "Position",
        placeholder: "Select position",
        tooltip: "Please select the position you are interested in.",
        options: positionBysubfields
    },
]





