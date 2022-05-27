// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'add-new-employee',
                    title: <FormattedMessage id="add-new-employee" />,
                    type: 'item',
                    url: '/add-new-employee'
                },
                {
                    id: 'employee-list',
                    title: <FormattedMessage id="employee-list" />,
                    type: 'item',
                    url: '/employees'
                },
                {
                    id: 'add-new-rfid-card',
                    title: <FormattedMessage id="add-new-rfid-card" />,
                    type: 'item',
                    url: '/add-new-rfid-card'
                },
                {
                    id: 'add-new-fingerprint-record',
                    title: <FormattedMessage id="add-new-fingerprint-record" />,
                    type: 'item',
                    url: '/add-new-fingerprint-record'
                }
            ]
        }
    ]
};

export default application;
