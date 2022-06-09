// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconList,
    IconUserPlus
} from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconList,
    IconUserPlus
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'employees',
            title: <FormattedMessage id="employees" />,
            type: 'collapse',
            icon: icons.IconUserPlus,
            children: [
                {
                    id: 'add-new-employee',
                    title: <FormattedMessage id="add-new-employee" />,
                    type: 'item',
                    url: '/add-new-employee'
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
        },
        {
            id: 'resources',
            title: <FormattedMessage id="resources" />,
            type: 'collapse',
            icon: icons.IconList,
            children: [
                {
                    id: 'employee-list',
                    title: <FormattedMessage id="employee-list" />,
                    type: 'item',
                    url: '/employees'
                },
                {
                    id: 'rfid-list',
                    title: <FormattedMessage id="rfid-list" />,
                    type: 'item',
                    url: '/badges'
                },
                {
                    id: 'fingerprint-list',
                    title: <FormattedMessage id="fingerprint-list" />,
                    type: 'item',
                    url: '/fingerprints'
                }
            ]
        }
    ]
};

export default application;
