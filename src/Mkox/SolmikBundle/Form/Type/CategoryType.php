<?php

namespace Mkox\SolmikBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Defines the form used to create and manipulate categories.
 */
class CategoryType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // for the full reference of options defined by each form field type
        // see http://symfony.com/doc/current/reference/forms/types.html
        $builder
            ->add('name')
            ->add('public', 'checkbox', array('required' => false))
            ->add('save', 'submit')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Mkox\SolmikBundle\Entity\Category',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'solmik_category';
    }
}
