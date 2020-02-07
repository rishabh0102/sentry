from __future__ import absolute_import, print_function

from sentry.auth.providers.saml2.generic.view import GenericSAML2View


class ActiveDirectorySAML2View(GenericSAML2View):
    print('=\n==== ACTIVE DIRECTORY')
