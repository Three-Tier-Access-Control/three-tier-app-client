// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconLock } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconLock
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const access = {
    id: 'access-logs',
    title: <FormattedMessage id="access-logs" />,
    type: 'group',
    children: [
        {
            id: 'access',
            title: <FormattedMessage id="access" />,
            type: 'item',
            url: '/access-logs',
            icon: icons.IconLock,
            breadcrumbs: false
        }
    ]
};

export default access;
