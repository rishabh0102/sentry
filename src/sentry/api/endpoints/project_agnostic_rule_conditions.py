from __future__ import absolute_import


from sentry.api.base import Endpoint
from sentry.rules import rules
from rest_framework.response import Response


class ProjectAgnosticRuleConditionsEndpoint(Endpoint):
    permission_classes = ()

    def get(self, request):
        """
        Retrieve the list of rule conditions
        """

        def info_extractor(rule_cls):
            context = {"id": rule_cls.id, "label": rule_cls.label}
            if hasattr(rule_cls, "form_fields"):
                context["formFields"] = rule_cls.form_fields
            return context

        return Response(
            [
                info_extractor(rule_cls)
                for rule_type, rule_cls in rules
                if rule_type.startswith("condition/")
            ]
        )
